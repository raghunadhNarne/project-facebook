let userData = JSON.parse(localStorage.getItem("userData"));
// console.log(userData,"hiiiiiiii")
window.onload = async ()=>{
    obj = {
        email: JSON.parse(localStorage.getItem("userData")).email
    }
    let posts = await $.post("http://localhost:7777/index/getMyPosts", obj);
    // console.log("posts",posts.data)
    await renderPosts(posts.data);
}

async function renderComment(comment){
    // console.log("comment",comment)
    let commentHtml = `<li>
        <div class="comet-avatar">
            <img src="${comment.userPic}" onerror="this.onerror=null; this.src='../static/images/resources/defaultUser.png'" alt="Default Image">
        </div>
        <div class="we-comment">
            <div class="coment-head">
                <h5><a href="time-line.html" title="">${comment.userName}</a></h5>
                <span>${comment.commentedTime}</span>
                <a class="we-reply" href="#" title="Reply"><i class="fa fa-reply"></i></a>
            </div>
            <p>${comment.commentText}</p>
        </div>
        
    </li>`
    // console.log("new comment",commentHtml)
    return commentHtml
}


async function renderComments(comments){
    let commentsHtml = "";
    for(let comment of comments){
        // console.log("comment data",comment);
        commentsHtml += await renderComment(comment);
    }
    return commentsHtml;
}


async function renderPosts(posts){
    for (x in posts) {
        // console.log("hello",x)
        let post = posts[x];
        // console.log("hi",post);
        let appendComments = await renderComments(post.comments);
        // console.log("hi",appendComments)
        // let spost = JSON.stringify(post);
        // let suserData = JSON.stringify(userData);



        let likeResult = await getLikeData(post);
        if(post.postType =="text"){
            $("#loadMore").append(
                `<div class="central-meta item">
                <div class="user-post">
                    <div class="friend-info">
                        <figure>
                            <img src="../${post.userPic}" onerror="this.onerror=null; this.src='../static/images/resources/defaultUser.png'" alt="Default Image">
                        </figure>
                        <div class="friend-name">
                            <ins><a href="time-line.html" title="">${post.userName}</a></ins>
                            <span>published: ${post.postedTime}</span>
                        </div>
                        <div class="post-meta">
                            <div class="description"> 
                                <p>
                                    ${post.postText}
                                </p>
                            </div>
                            <div class="we-video-info">
                                <ul>
                                    <li>
                                    <span class="comment" data-toggle="tooltip" title="Comments">
                                        <i class="fa fa-comments-o"></i>
                                        <ins>${post.comments?.length ? post.comments?.length : 0}</ins>
                                    </span>
                                    </li>
                                    <li>
                                        <span class="like" data-toggle="tooltip" title="like" onclick = "toggleLike('${post.postId}','${post.likedUsers}','${post.dislikedUsers}')">
                                            <i class="fa fa-heart ${likeResult.likeClass}" id="likeicon"></i> 
                                            <ins>${post.likedUsers?.length ? post.likedUsers?.length : 0}</ins>
                                        </span>
                                    </li>
                                    <li>
                                        <span class="dislike" data-toggle="tooltip" title="dislike"  onclick = "toggleDislike('${post.postId}','${post.likedUsers}','${post.dislikedUsers}')">
                                            <i class="fa fa-heartbeat ${likeResult.dislikeClass}"  id="dislikeicon"></i>
                                            <ins>${post.dislikedUsers?.length ? post.dislikedUsers?.length : 0}</ins>
                                        </span>
                                    </li>
                                    <li class="social-media">
                                        <div class="menu">
                                            <div class="btn trigger"><i class="fa fa-share-alt"></i></div>
                                            <div class="rotater">
                                                <div class="btn btn-icon"><a href="#" title=""><i class="fa fa-html5"></i></a></div>
                                            </div>
                                            <div class="rotater">
                                                <div class="btn btn-icon"><a href="${userData.facebookLink}" title=""><i class="fa fa-facebook"></i></a></div>
                                            </div>
                                            <div class="rotater">
                                                <div class="btn btn-icon"><a href="${userData.googleLink}" title=""><i class="fa fa-google-plus"></i></a></div>
                                            </div>
                                            <div class="rotater">
                                                <div class="btn btn-icon"><a href="${userData.twitterLink}" title=""><i class="fa fa-twitter"></i></a></div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="coment-area">
                        <ul class="we-comet">


                        ${appendComments}


                            <li>
                                <a href="#" title="" class="showmore underline">more comments</a>
                            </li>
                            <li class="post-comment">
                                <div class="comet-avatar">
                                    <img src="${userData.profilePic}" onerror="this.onerror=null; this.src='../static/images/resources/defaultUser.png'" alt="Default Image">
                                </div>
                                <div class="post-comt-box">
                                    <form name="commentsForm" id="commentsForm">
                                        <textarea id="${post.postId}Comment" style="display: inline-block; width: 80%;" placeholder="Post your comment"></textarea>
                                        <button name="submitComment" id="submitComment" style="display: inline-block;" class="btn btn-primary" 
                                                onclick="submitMyComment('${post.postId}')"> Post
                                        </button>
                                    </form>
                              
                              
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>`
            )
        }



        else if(post.postType == "image"){
            $("#loadMore").append(
                `<div class="central-meta item">
                <div class="user-post">
                    <div class="friend-info">
                        <figure>
                            <img src="../${post.userPic}" onerror="this.onerror=null; this.src='../static/images/resources/defaultUser.png'" alt="Default Image">
                        </figure>
                        <div class="friend-name">
                            <ins><a href="time-line.html" title="">${post.userName}</a></ins>
                            <span>published: ${post.postedTime}</span>
                        </div>
                        <div class="post-meta">
                            <img src="../${post.postImage}" alt="">
                            <div class="we-video-info">
                                <ul>
                                    <li>
                                    <span class="comment" data-toggle="tooltip" title="Comments">
                                        <i class="fa fa-comments-o"></i>
                                        <ins>${post.comments?.length ? post.comments?.length : 0}</ins>
                                    </span>
                                    </li>
                                    <li>
                                        <span class="like" data-toggle="tooltip" title="like" onclick = "toggleLike('${post.postId}')">
                                            <i class="fa fa-heart ${likeResult.likeClass}" id="likeicon"></i> 
                                            <ins>${post.likedUsers?.length ? post.likedUsers?.length : 0}</ins>
                                        </span>
                                    </li>
                                    <li>
                                        <span class="dislike" data-toggle="tooltip" title="dislike"  onclick = "toggleDislike('${post.postId}','${post.likedUsers}','${post.dislikedUsers}')">
                                            <i class="fa fa-heartbeat ${likeResult.dislikeClass}"  id="dislikeicon"></i>
                                            <ins>${post.dislikedUsers?.length ? post.dislikedUsers?.length : 0}</ins>
                                        </span>
                                    </li>
                                    <li class="social-media">
                                        <div class="menu">
                                            <div class="btn trigger"><i class="fa fa-share-alt"></i></div>
                                            <div class="rotater">
                                                <div class="btn btn-icon"><a href="#" title=""><i class="fa fa-html5"></i></a></div>
                                            </div>
                                            <div class="rotater">
                                                <div class="btn btn-icon"><a href="${userData.facebookLink}" title=""><i class="fa fa-facebook"></i></a></div>
                                            </div>
                                            <div class="rotater">
                                                <div class="btn btn-icon"><a href="${userData.googleLink}" title=""><i class="fa fa-google-plus"></i></a></div>
                                            </div>
                                            <div class="rotater">
                                                <div class="btn btn-icon"><a href="${userData.twitterLink}" title=""><i class="fa fa-twitter"></i></a></div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="description">
                                
                                <p>
                                    ${post.postText}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="coment-area">
                        <ul class="we-comet">


                        ${appendComments}


                            <li>
                                <a href="#" title="" class="showmore underline">more comments</a>
                            </li>
                            <li class="post-comment">
                                <div class="comet-avatar">
                                    <img src="${userData.profilePic}" onerror="this.onerror=null; this.src='../static/images/resources/defaultUser.png'" alt="Default Image">
                                </div>
                                <div class="post-comt-box">
                                    <form name="commentsForm" id="commentsForm">
                                        <textarea id="${post.postId}Comment" style="display: inline-block; width: 80%;" placeholder="Post your comment"></textarea>
                                        <button name="submitComment" id="submitComment" style="display: inline-block;" class="btn btn-primary" 
                                                onclick="submitMyComment('${post.postId}')"> Post
                                        </button>
                                    </form>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>`
            )
        }


        // if post is videopost
        else{
            $("#loadMore").append(
                `<div class="central-meta item">
                <div class="user-post">
                    <div class="friend-info">
                        <figure>
                            <img src="../${post.userPic}" onerror="this.onerror=null; this.src='../static/images/resources/defaultUser.png'" alt="Default Image">
                        </figure>
                        <div class="friend-name">
                            <ins><a href="time-line.html" title="">${post.userName}</a></ins>
                            <span>published: ${post.postedTime}</span>
                        </div>
                        <div class="post-meta">
                            <video width="100%" height="400px" controls loop>  
                                <source src="../${post.postVideo}" type="video/mp4">  
                                <source src="../${post.postVideo}" type="video/webm">
                                <source src="../${post.postVideo}" type="video/ogg">
                                Your browser does not support the html video tag.  
                            </video> 
                            <div class="we-video-info">
                                <ul>
                                    <li>
                                        <span class="comment" data-toggle="tooltip" title="Comments">
                                            <i class="fa fa-comments-o"></i>
                                            <ins>${post.comments?.length ? post.comments?.length : 0}</ins>
                                        </span>
                                    </li>
                                    <li>
                                        <span class="like" data-toggle="tooltip" title="like" onclick = "toggleLike('${post.postId}','${post.likedUsers}','${post.dislikedUsers}')">
                                            <i class="fa fa-heart ${likeResult.likeClass}" id="likeicon"></i> 
                                            <ins>${post.likedUsers?.length ? post.likedUsers?.length : 0}</ins>
                                        </span>
                                    </li>
                                    <li>
                                        <span class="dislike" data-toggle="tooltip" title="dislike"  onclick = "toggleDislike('${post.postId}','${post.likedUsers}','${post.dislikedUsers}')">
                                            <i class="fa fa-heartbeat ${likeResult.dislikeClass}"  id="dislikeicon"></i>
                                            <ins>${post.dislikedUsers?.length ? post.dislikedUsers?.length : 0}</ins>
                                        </span>
                                    </li>
                                    <li class="social-media">
                                        <div class="menu">
                                            <div class="btn trigger"><i class="fa fa-share-alt"></i></div>
                                            <div class="rotater">
                                                <div class="btn btn-icon"><a href="#" title=""><i class="fa fa-html5"></i></a></div>
                                            </div>
                                            <div class="rotater">
                                                <div class="btn btn-icon"><a href="${userData.facebookLink}" title=""><i class="fa fa-facebook"></i></a></div>
                                            </div>
                                            <div class="rotater">
                                                <div class="btn btn-icon"><a href="${userData.googleLink}" title=""><i class="fa fa-google-plus"></i></a></div>
                                            </div>
                                            <div class="rotater">
                                                <div class="btn btn-icon"><a href="${userData.twitterLink}" title=""><i class="fa fa-twitter"></i></a></div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="description">
                                
                                <p>
                                    ${post.postText}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="coment-area">
                        <ul class="we-comet">


                        ${appendComments}


                            <li>
                                <a href="#" title="" class="showmore underline">more comments</a>
                            </li>
                            <li class="post-comment">
                                <div class="comet-avatar">
                                    <img src="${userData.profilePic}" onerror="this.onerror=null; this.src='../static/images/resources/defaultUser.png'" alt="Default Image">
                                </div>
                                <div class="post-comt-box">
                                    <form name="commentsForm" id="commentsForm">
                                        <textarea id="${post.postId}Comment" style="display: inline-block; width: 80%;" placeholder="Post your comment"></textarea>
                                        <button name="submitComment" id="submitComment" style="display: inline-block;" class="btn btn-primary" 
                                                onclick="submitMyComment('${post.postId}')"> Post
                                        </button>
                                    </form>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>`
            )
        }
    }
}



async function getLikeData(currentPost){
    let currentUserData = userData;
    let currentUserEmail = currentUserData.email;

    let likeResult = {
        likeClass : "grey",
        dislikeClass : "grey"
    }
    if(currentPost.likedUsers.indexOf(currentUserEmail) != -1){
        likeResult.likeClass = "red"
    }

    if(currentPost.dislikedUsers.indexOf(currentUserEmail) != -1){
        likeResult.dislikeClass = "red"
    }

    return likeResult;
}



async function toggleLike(likedPostId){
    let likedUserData = userData;
    // console.log("lkhj",likedUsers,likedPostId)
    // obj = {
    //     email: likedUserEmail
    // }
    // let likedUserData = await $.post("http://localhost:7777/index/getLikedUserData", obj); //need to push into recent activity

    // let likedPostData = await $.post("http://localhost:7777/index/getPostData", obj); //need to push into recent activity

    // document.getElementById("likeicon");
    // document.getElementById("dislikeicon");

    obj = {
        postId: likedPostId
    }
    let likedPostData = await $.post("http://localhost:7777/index/getPostData", obj);

    let likedUsers = likedPostData.data.likedUsers;
    let dislikedUsers = likedPostData.data.dislikedUsers;
    console.log("likedPostData",likedPostData)
    // console.log("hi",likedUsers,dislikedUsers)
    if(likedUsers.indexOf(likedUserData.email) == -1  && dislikedUsers.indexOf(likedUserData.email) == -1){
        //add like
        //add to recent activity

        console.log("adding like...");
        let heart = document.getElementById("likeicon");
        if(heart.classList.contains('grey')){
            heart.classList.remove('grey');
        }
        if(!heart.classList.contains('red')){
            heart.classList.add('red');
        }

        obj = {
            postId : likedPostId,
            email: likedUserData.email
        }
        await $.post("http://localhost:7777/index/addLike", obj);


        //adding to recent activity

        RecentObj = {
            email : likedPostData.data.userEmail,
            name : likedUserData.lastName,
            action : "liked"
        }
        await $.post("http://localhost:7777/recentActivity/addNewActivity", RecentObj);

    }
    else if(likedUsers.indexOf(likedUserData.email) != -1  && dislikedUsers.indexOf(likedUserData.email) == -1){
        //remove like
        //add to recent activity

        console.log("removing like...");
        let heart = document.getElementById("likeicon");
        if(heart.classList.contains('red')){
            heart.classList.remove('red');
        }
        if(!heart.classList.contains('grey')){
            heart.classList.add('grey');
        }

        obj = {
            postId : likedPostId,
            email: likedUserData.email
        }
        await $.post("http://localhost:7777/index/removeLike", obj);



        //adding to recent activity

        RecentObj = {
            email : likedPostData.data.userEmail,
            name : likedUserData.lastName,
            action : "removed existing like"
        }
        console.log("RecentObj",RecentObj)
        await $.post("http://localhost:7777/recentActivity/addNewActivity", RecentObj);

    }
    else if(likedUsers.indexOf(likedUserData.email) == -1  && dislikedUsers.indexOf(likedUserData.email) != -1){
        //remove dislike and add like
        //add to recent activity

        console.log("removing dislike and adding like...");
        let hearBroken = document.getElementById("dislikeicon");
        if(hearBroken.classList.contains('red')){
            hearBroken.classList.remove('red');
        }
        if(!hearBroken.classList.contains('grey')){
            hearBroken.classList.add('grey');
        }
        

        let heart = document.getElementById("likeicon");
        if(heart.classList.contains('grey')){
            heart.classList.remove('grey');
        }
        if(!heart.classList.contains('red')){
            heart.classList.add('red');
        }

        obj = {
            postId : likedPostId,
            email: likedUserData.email
        }

        await $.post("http://localhost:7777/index/removeDislike", obj);
        await $.post("http://localhost:7777/index/addLike", obj);




        //adding to recent activity

        obj = {
            email : likedPostData.data.userEmail,
            name : likedUserData.lastName,
            action : "liked"
        }
        await $.post("http://localhost:7777/recentActivity/addNewActivity", obj);

    }

}




async function toggleDislike(dislikedPostId){
    // document.getElementById("likeicon");
    // document.getElementById("dislikeicon");
    let dislikedUserData = userData;
    // console.log("ghjk",dislikedUserData)



    obj = {
        postId: dislikedPostId
    }
    let likedPostData = await $.post("http://localhost:7777/index/getPostData", obj);

    let likedUsers = likedPostData.data.likedUsers;
    let dislikedUsers = likedPostData.data.dislikedUsers;

    if(likedUsers.indexOf(dislikedUserData.email) == -1  && dislikedUsers.indexOf(dislikedUserData.email) == -1){
        //add dislike
        //add to recent activity

        console.log("adding dislike...")
        let heartBroken = document.getElementById("dislikeicon");
        if(heartBroken.classList.contains('grey')){
            heartBroken.classList.remove('grey');
        }
        if(!heartBroken.classList.contains('red')){
            heartBroken.classList.add('red');
        }

        obj = {
            postId : dislikedPostId,
            email: dislikedUserData.email
        }
        await $.post("http://localhost:7777/index/addDislike", obj);


        //adding to recent activity

        obj = {
            email : likedPostData.data.userEmail,
            name : dislikedUserData.lastName,
            action : "disliked"
        }
        await $.post("http://localhost:7777/recentActivity/addNewActivity", obj);


    }
    else if(likedUsers.indexOf(dislikedUserData.email) == -1  && dislikedUsers.indexOf(dislikedUserData.email) != -1){
        //remove dislike
        //add to recent activity

        console.log("removing dislike...")
        let heartBroken = document.getElementById("dislikeicon");
        if(heartBroken.classList.contains('red')){
            heartBroken.classList.remove('red');
        }
        if(!heartBroken.classList.contains('grey')){
            heartBroken.classList.add('grey');
        }
        


        obj = {
            postId : dislikedPostId,
            email: dislikedUserData.email
        }
        await $.post("http://localhost:7777/index/removeDislike", obj);


         //adding to recent activity

         obj = {
            email : likedPostData.data.userEmail,
            name : dislikedUserData.lastName,
            action : "removed existing disliked"
        }
        await $.post("http://localhost:7777/recentActivity/addNewActivity", obj);

    }
    else if(likedUsers.indexOf(dislikedUserData.email) != -1  && dislikedUsers.indexOf(dislikedUserData.email) == -1){
        //remove like and add dislike
        //add to recent activity

        console.log("removing like and adding dislike...")
        let heart = document.getElementById("likeicon");
        if(heart.classList.contains('red')){
            heart.classList.remove('red');
        }
        if(!heart.classList.contains('grey')){
            heart.classList.add('grey');
        }


        let heartBroken = document.getElementById("dislikeicon");
        if(heartBroken.classList.contains('grey')){
            heartBroken.classList.remove('grey');
        }
        if(!heartBroken.classList.contains('red')){
            heartBroken.classList.add('red');
        }

        obj = {
            postId : dislikedPostId,
            email: dislikedUserData.email
        }

        await $.post("http://localhost:7777/index/removelike", obj);
        await $.post("http://localhost:7777/index/addDislike", obj);



         //adding to recent activity

         obj = {
            email : likedPostData.data.userEmail,
            name : dislikedUserData.lastName,
            action : "disliked"
        }
        await $.post("http://localhost:7777/recentActivity/addNewActivity", obj);

    }
}




async function submitMyComment(postid){
    //add comment to post database
    //add event to recent activity
    //render comment in frontend page



    let newCommentText = $(`#${postid}Comment`).val()
    console.log("newCommentText",newCommentText)
    let commentedUserdata = userData;



    let newComment = {
        postId : postid,
        userPic : commentedUserdata.profilePic,
        userName : commentedUserdata.lastName,
        commentText : newCommentText,
    }
    // console.log("newComment",newComment)

    //addding comment to posts database
    await $.post("http://localhost:7777/index/addNewComment", newComment);
}

//What is this bro?