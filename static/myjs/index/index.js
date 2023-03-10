let userData = JSON.parse(localStorage.getItem("userData"));


groupName = window.location.hash
link = window.location.href

window.onload = async ()=>{
    let result = await validateUser();

    
    obj = {
        email: JSON.parse(localStorage.getItem("userData")).email
    }
    
    let posts;
    if(groupName.length==0 || !link.includes("groupIndex.html")){
        posts = await $.post(backendHost+"/index/getMyFeedPosts", obj);
        // console.log(posts,"posts")
    }
    else{
        let obj={
            groupName : groupName.substring(1)
        }
        posts = await $.post(backendHost+"/groups/getGroupPosts",obj);
    }

    // console.log("posts",posts.data)
    await renderPosts(posts.data);
    let totalFriendsAndFollowers = await $.post(backendHost+"/friends/totalfriendandfollowers",obj)
    $("#myfollowers").text(totalFriendsAndFollowers.data.followers)
    $("#friends").text(totalFriendsAndFollowers.data.friends)

    let totalLikesAndPosts = await $.post(backendHost+"/index/totallikesandposts",obj)
    $("#totallikes").text(totalLikesAndPosts?.data?.likedCount || 0)
    $("#totalposts").text(totalLikesAndPosts?.data?.postsCount || 0)
    $("#fromlastweeklikescount").text(totalLikesAndPosts?.data?.fromlastweeklikescount || 0)
    $("#fromlastweekpostscount").text(totalLikesAndPosts?.data?.fromlastweekpostscount || 0)


    try{
        let ads=await $.get(backendHost+"/ads/getallads")
        $("#link").attr('href',ads.data[0].link)
        $(".bg-image").css('background-image',`url(${ads.data[0].adImage})`)
    }
    catch(e){
        console.log("no ads...")
    }

    let notifications = await $.post(backendHost+"/notifications/getMyNotifications",{email:userData.email})
    $("#notifications").text(notifications?.count || 0)


    $("#firstName").text(userData.firstName)
    $("#myPagePic").attr('src',userData.profilePic)
}

async function renderComment(comment){
    // console.log("comment",comment)
    let commentHtml = `<li>
        <div class="comet-avatar">
            <img src="${comment.userPic}" onerror="this.onerror=null; this.src='../static/images/resources/defaultUser.png'" alt="Default Image">
        </div>
        <div class="we-comment">
            <div class="coment-head">
                <h5><a href="profile.html#${comment.userEmail}" title="">${comment.userName}</a></h5>
                <span>${comment.commentedTime}</span>
                <a class="we-reply" href="#" title="Reply"><i class="fa fa-reply"></i></a>
            </div>
            <p>${comment.commentText}</p>
        </div>
        
    </li>`
    return commentHtml
}


async function renderComments(comments){
    let commentsHtml = "";
    for(let i = comments.length - 1; i >= 0 && i >= comments.length - 4; i--){
        let comment = comments[i];
        commentsHtml += await renderComment(comment);
    }
    return commentsHtml;
}


async function renderPosts(posts){
    for (x in posts) {
        // console.log("all posts: ",posts)
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
                            <img src="${post.userPic}" onerror="this.onerror=null; this.src='../static/images/resources/defaultUser.png'" alt="Default Image">
                        </figure>
                        <div class="friend-name">
                            <ins><a href="profile.html#${post.userEmail}" title="">${post.userName}</a></ins>
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
                                        <ins id="${post._id}commentsCount">${post.comments?.length ? post.comments?.length : 0}</ins>
                                    </span>
                                    </li>
                                    <li>
                                        <span class="like" data-toggle="tooltip" title="like" onclick = "toggleLike('${post._id}')">
                                            <i class="fa fa-heart ${likeResult.likeClass}" id="${post._id}likeicon"></i> 
                                            <ins id="${post._id}likeCount">${post.likedUsers?.length ? post.likedUsers?.length : 0}</ins>
                                        </span>
                                    </li>
                                    <li>
                                        <span class="dislike" data-toggle="tooltip" title="dislike"  onclick = "toggleDislike('${post._id}')">
                                            <i class="fa fa-heartbeat ${likeResult.dislikeClass}"  id="${post._id}dislikeicon"></i>
                                            <ins id="${post._id}dislikeCount">${post.dislikedUsers?.length ? post.dislikedUsers?.length : 0}</ins>
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
                                <a href="post.html#${post._id}" title="" class="showmore underline">more comments</a>
                            </li>
                            <li class="post-comment">
                                <div class="comet-avatar">
                                    <img src="${userData.profilePic}" onerror="this.onerror=null; this.src='../static/images/resources/defaultUser.png'" alt="Default Image">
                                </div>
                                <div class="post-comt-box">
                                    <form name="commentsForm" id="commentsForm">
                                        <textarea id="${post._id}Comment" style="display: inline-block; width: 80%;" placeholder="Post your comment"></textarea>
                                        <button name="submitComment" id="submitComment" style="background-color:blue;display: inline-block;" class="btn btn-primary" 
                                                onclick="submitMyComment(event,'${post._id}')"> Post
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


        //if post is image post
        else if(post.postType == "image"){
            $("#loadMore").append(
                `<div class="central-meta item">
                <div class="user-post">
                    <div class="friend-info">
                        <figure>
                            <img src="${post.userPic}" onerror="this.onerror=null; this.src='../static/images/resources/defaultUser.png'" alt="Default Image">
                        </figure>
                        <div class="friend-name">
                            <ins><a href="#${post.userEmail}" title="">${post.userName}</a></ins>
                            <span>published: ${post.postedTime}</span>
                        </div>
                        <div class="post-meta">
                            <img style="height:auto;width:100%;"src="${post.postImage}" onerror="this.onerror=null; this.src='../static/images/resources/defaultPost.png'" alt="image not found">
                            <div class="we-video-info">
                                <ul>
                                    <li>
                                    <span class="comment" data-toggle="tooltip" title="Comments">
                                        <i class="fa fa-comments-o"></i>
                                        <ins id="${post._id}commentCount">${post.comments?.length ? post.comments?.length : 0}</ins>
                                    </span>
                                    </li>
                                    <li>
                                        <span class="like" data-toggle="tooltip" title="like" onclick = "toggleLike('${post._id}')">
                                            <i class="fa fa-heart ${likeResult.likeClass}" id="${post._id}likeicon"></i> 
                                            <ins id="${post._id}likeCount">${post.likedUsers?.length ? post.likedUsers?.length : 0}</ins>
                                        </span>
                                    </li>
                                    <li>
                                        <span class="dislike" data-toggle="tooltip" title="dislike"  onclick = "toggleDislike('${post._id}')">
                                            <i class="fa fa-heartbeat ${likeResult.dislikeClass}"  id="${post._id}dislikeicon"></i>
                                            <ins id="${post._id}dislikeCount">${post.dislikedUsers?.length ? post.dislikedUsers?.length : 0}</ins>
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
                                <a href="post.html#${post._id}" title="" class="showmore underline">more comments</a>
                            </li>
                            <li class="post-comment">
                                <div class="comet-avatar">
                                    <img src="${userData.profilePic}" onerror="this.onerror=null; this.src='../static/images/resources/defaultUser.png'" alt="Default Image">
                                </div>
                                <div class="post-comt-box">
                                    <form name="commentsForm" id="commentsForm" >
                                        <textarea id="${post._id}Comment" style="display: inline-block; width: 80%;" placeholder="Post your comment"></textarea>
                                        <button name="submitComment" id="submitComment" style="background-color:blue;display: inline-block;" class="btn btn-primary" 
                                                onclick="submitMyComment(event,'${post._id}')"> Post
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
                            <img src="${post.userPic}" onerror="this.onerror=null; this.src='../static/images/resources/defaultUser.png'" alt="Default Image">
                        </figure>
                        <div class="friend-name">
                            <ins><a href="#${post.userEmail}" title="">${post.userName}</a></ins>
                            <span>published: ${post.postedTime}</span>
                        </div>
                        <div class="post-meta">
                            <video width="100%" height="400px" controls loop>  
                                <source src="${post.postVideo}" type="video/mp4">  
                                <source src="${post.postVideo}" type="video/webm">
                                <source src="${post.postVideo}" type="video/ogg">
                                Your browser does not support the html video tag.  
                            </video> 
                            <div class="we-video-info">
                                <ul>
                                    <li>
                                        <span class="comment" data-toggle="tooltip" title="Comments">
                                            <i class="fa fa-comments-o"></i>
                                            <ins id="${post._id}commentsCount">${post.comments?.length ? post.comments?.length : 0}</ins>
                                        </span>
                                    </li>
                                    <li>
                                        <span class="like" data-toggle="tooltip" title="like" onclick = "toggleLike('${post._id}')">
                                            <i class="fa fa-heart ${likeResult.likeClass}" id="${post._id}likeicon"></i> 
                                            <ins id="${post._id}likeCount">${post.likedUsers?.length ? post.likedUsers?.length : 0}</ins>
                                        </span>
                                    </li>
                                    <li>
                                        <span class="dislike" data-toggle="tooltip" title="dislike"  onclick = "toggleDislike('${post._id}')">
                                            <i class="fa fa-heartbeat ${likeResult.dislikeClass}"  id="${post._id}dislikeicon"></i>
                                            <ins id="${post._id}dislikeCount">${post.dislikedUsers?.length ? post.dislikedUsers?.length : 0}</ins>
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
                                <a href="post.html#${post._id}" title="" class="showmore underline">more comments</a>
                            </li>
                            <li class="post-comment">
                                <div class="comet-avatar">
                                    <img src="${userData.profilePic}" onerror="this.onerror=null; this.src='../static/images/resources/defaultUser.png'" alt="Default Image">
                                </div>
                                <div class="post-comt-box">
                                    <form name="commentsForm" id="commentsForm" >
                                        <textarea id="${post._id}Comment" style="display: inline-block; width: 80%;" placeholder="Post your comment"></textarea>
                                        <button name="submitComment" id="submitComment" style="background-color:blue;display: inline-block;" class="btn btn-primary" 
                                                onclick="submitMyComment(event,'${post._id}')"> Post
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

    obj = {
        postId: likedPostId     //this is object id
    }
    let likedPostData = await $.post(backendHost+"/index/getPostData", obj);

    let likedUsers = likedPostData.data.likedUsers;
    let dislikedUsers = likedPostData.data.dislikedUsers;
    console.log(likedUsers,dislikedUsers)
    if(likedUsers.indexOf(likedUserData.email) == -1  && dislikedUsers.indexOf(likedUserData.email) == -1){
        //add like
        //add to recent activity

        console.log("adding like...");
        let heart = document.getElementById(`${likedPostId}likeicon`);
        heart.className = "fa fa-heart red"
        // $(`#${likedPostId}likeCount`).val(parseInt( $(`#${likedPostId}likeCount`).val() ,10) + 1)
        let likeCount = document.getElementById(`${likedPostId}likeCount`);
        let currentValue = parseInt(likeCount.innerHTML);
        likeCount.innerHTML = currentValue + 1;

        

        obj = {
            postId : likedPostId,
            email: likedUserData.email
        }
        await $.post(backendHost+"/index/addLike", obj);


        //adding to recent activity

        recentObj = {
            email : likedUserData.email,
            name : likedPostData.data.userName,
            action : "liked"
        }
        await $.post(backendHost+"/recentActivity/addNewActivity", recentObj);


        notificationObj = {
            email : likedPostData.data.userEmail,
            name : likedUserData.firstName,
            action : "liked your post",
            url : frontendHost+`/post.html#${likedPostId}`
        }
        await $.post(backendHost+"/notifications/addNewNotification", notificationObj);


    }
    else if(likedUsers.indexOf(likedUserData.email) != -1  && dislikedUsers.indexOf(likedUserData.email) == -1){
        //remove like
        //add to recent activity

        console.log("removing like...");
        let heart = document.getElementById(`${likedPostId}likeicon`);
        heart.className = "fa fa-heart grey"
        // $(`#${likedPostId}likeCount`).val(parseInt( $(`#${likedPostId}likeCount`).val() ,10) - 1)
        let likeCount = document.getElementById(`${likedPostId}likeCount`);
        let currentValue = parseInt(likeCount.innerHTML);
        likeCount.innerHTML = currentValue - 1;


        obj = {
            postId : likedPostId,
            email: likedUserData.email
        }
        await $.post(backendHost+"/index/removeLike", obj);



        //adding to recent activity

        RecentObj = {
            email : likedUserData.email,
            name : likedPostData.data.userName,
            action : "removed existing like"
        }
        console.log("RecentObj",RecentObj)
        await $.post(backendHost+"/recentActivity/addNewActivity", RecentObj);


        notificationObj = {
            email : likedPostData.data.userEmail,
            name : likedUserData.firstName,
            action : "removed existing like on your post",
            url : frontendHost+`/post.html#${likedPostId}`
        }
        await $.post(backendHost+"/notifications/addNewNotification", notificationObj);


    }
    else if(likedUsers.indexOf(likedUserData.email) == -1  && dislikedUsers.indexOf(likedUserData.email) != -1){
        //remove dislike and add like
        //add to recent activity

        console.log("removing dislike and adding like...");
        let heartBroken = document.getElementById(`${likedPostId}dislikeicon`);
        heartBroken.className = "fa fa-heartbeat grey"
        // $(`#${likedPostId}dislikeCount`).val(parseInt( $(`#${likedPostId}dislikeCount`).val() ,10) - 1)
        let dislikeCount = document.getElementById(`${likedPostId}dislikeCount`);
        let currentVal = parseInt(dislikeCount.innerHTML);
        dislikeCount.innerHTML = currentVal - 1;

        

        let heart = document.getElementById(`${likedPostId}likeicon`);
        heart.className = "fa fa-heart red"
        // $(`#${likedPostId}likeCount`).val(parseInt( $(`#${likedPostId}likeCount`).val() ,10) + 1)
        let likeCount = document.getElementById(`${likedPostId}likeCount`);
        let currentValue = parseInt(likeCount.innerHTML);
        likeCount.innerHTML = currentValue + 1;



        obj = {
            postId : likedPostId,
            email: likedUserData.email
        }

        await $.post(backendHost+"/index/removeDislike", obj);
        await $.post(backendHost+"/index/addLike", obj);




        //adding to recent activity

        obj = {
            email : likedUserData.email,
            name : likedPostData.data.userName,
            action : "liked"
        }
        await $.post(backendHost+"/recentActivity/addNewActivity", obj);


        notificationObj = {
            email : likedPostData.data.userEmail,
            name : likedUserData.firstName,
            action : "liked your post",
            url : frontendHost+`/post.html#${likedPostId}`
        }
        await $.post(backendHost+"/notifications/addNewNotification", notificationObj);


    }

}




async function toggleDislike(dislikedPostId){
    let dislikedUserData = userData;


    obj = {
        postId: dislikedPostId
    }
    let likedPostData = await $.post(backendHost+"/index/getPostData", obj);

    let likedUsers = likedPostData.data.likedUsers;
    let dislikedUsers = likedPostData.data.dislikedUsers;

    if(likedUsers.indexOf(dislikedUserData.email) == -1  && dislikedUsers.indexOf(dislikedUserData.email) == -1){
        //add dislike
        //add to recent activity

        console.log("adding dislike...")
        let heartBroken = document.getElementById(`${dislikedPostId}dislikeicon`);
        heartBroken.className = "fa fa-heartbeat red"
        // $(`#${dislikedPostId}dislikeCount`).val(parseInt( $(`#${dislikedPostId}dislikeCount`).val() ,10) + 1)
        let dislikeCount = document.getElementById(`${dislikedPostId}dislikeCount`);
        let currentValue = parseInt(dislikeCount.innerHTML);
        dislikeCount.innerHTML = currentValue + 1;



        obj = {
            postId : dislikedPostId,
            email: dislikedUserData.email
        }
        await $.post(backendHost+"/index/addDislike", obj);


        //adding to recent activity

        obj = {
            email : dislikedUserData.email,
            name : likedPostData.data.userName,
            action : "disliked"
        }
        await $.post(backendHost+"/recentActivity/addNewActivity", obj);


        notificationObj = {
            email : likedPostData.data.userEmail,
            name : dislikedUserData.firstName,
            action : "disliked your post",
            url : frontendHost+`/post.html#${dislikedPostId}`
        }
        await $.post(backendHost+"/notifications/addNewNotification", notificationObj);
    }


    else if(likedUsers.indexOf(dislikedUserData.email) == -1  && dislikedUsers.indexOf(dislikedUserData.email) != -1){
        //remove dislike
        //add to recent activity

        console.log("removing dislike...")
        let heartBroken = document.getElementById(`${dislikedPostId}dislikeicon`);
        heartBroken.className = "fa fa-heartbeat grey"
        // $(`#${dislikedPostId}dislikeCount`).val(parseInt( $(`#${dislikedPostId}dislikeCount`).val() ,10) - 1)
        let dislikeCount = document.getElementById(`${dislikedPostId}dislikeCount`);
        let currentValue = parseInt(dislikeCount.innerHTML);
        dislikeCount.innerHTML = currentValue - 1;




        obj = {
            postId : dislikedPostId,
            email: dislikedUserData.email
        }
        await $.post(backendHost+"/index/removeDislike", obj);


         //adding to recent activity

         obj = {
            email : dislikedUserData.email,
            name : likedPostData.data.userName,
            action : "removed existing dislike"
        }
        await $.post(backendHost+"/recentActivity/addNewActivity", obj);


        notificationObj = {
            email : likedPostData.data.userEmail,
            name : dislikedUserData.firstName,
            action : "removed existing dislike on your post",
            url : frontendHost+`/post.html#${dislikedPostId}`
        }
        await $.post(backendHost+"/notifications/addNewNotification", notificationObj);


    }
    else if(likedUsers.indexOf(dislikedUserData.email) != -1  && dislikedUsers.indexOf(dislikedUserData.email) == -1){
        //remove like and add dislike
        //add to recent activity

        console.log("removing like and adding dislike...")
        let heart = document.getElementById(`${dislikedPostId}likeicon`);
        heart.className = "fa fa-heart grey"
        // $(`#${dislikedPostId}likeCount`).val(parseInt( $(`#${dislikedPostId}likeCount`).val() ,10) - 1)
        let likeCount = document.getElementById(`${dislikedPostId}likeCount`);
        let currentVal = parseInt(likeCount.innerHTML);
        likeCount.innerHTML = currentVal - 1;




        let heartBroken = document.getElementById(`${dislikedPostId}dislikeicon`);
        heartBroken.className = "fa fa-heartbeat red"
        // console.log("count:",$(`#${dislikedPostId}dislikeCount`).val());
        // $(`#${dislikedPostId}dislikeCount`).val(parseInt( $(`#${dislikedPostId}dislikeCount`).val() ,10) + 1)
        let dislikeCount = document.getElementById(`${dislikedPostId}dislikeCount`);
        let currentValue = parseInt(dislikeCount.innerHTML);
        dislikeCount.innerHTML = currentValue + 1;

        obj = {
            postId : dislikedPostId,
            email: dislikedUserData.email
        }

        await $.post(backendHost+"/index/removelike", obj);
        await $.post(backendHost+"/index/addDislike", obj);



         //adding to recent activity

         obj = {
            email : dislikedUserData.email,
            name : likedPostData.data.userName,
            action : "disliked"
        }
        await $.post(backendHost+"/recentActivity/addNewActivity", obj);


        notificationObj = {
            email : likedPostData.data.userEmail,
            name : dislikedUserData.firstName,
            action : "disliked your post",
            url : frontendHost+`/post.html#${dislikedPostId}`
        }
        await $.post(backendHost+"/notifications/addNewNotification", notificationObj);


    }
}




async function submitMyComment(event,postid){
    event.preventDefault();
    //add comment to post database
    //add event to recent activity
    //render comment in frontend page



    let newCommentText = $(`#${postid}Comment`).val()
    // console.log("newCommentText",newCommentText)
    let commentedUserdata = userData;



    let newComment = {
        postId : postid,
        userPic : commentedUserdata.profilePic,
        userName : commentedUserdata.lastName,
        commentText : newCommentText,
        userEmail : commentedUserdata.email
    }

    //addding comment to posts database
    let result = await $.post(backendHost+"/index/addNewComment", newComment);
    Swal.fire({
        icon: 'success',
        title: result.message,
        
        showConfirmButton: false, 
        allowOutsideClick: false, 
        timer:2000
        
      });
    $(`#${postid}Comment`).val("")


    //adding to recent activity
    obj = {
        postId: postid     //this is object id
    }
    let commentedPostData = await $.post(backendHost+"/index/getPostData", obj);

    obj = {
        email : commentedUserdata.email,
        name : commentedPostData.data.userName,
        action : "commented"
    }
    await $.post(backendHost+"/recentActivity/addNewActivity", obj);


    

    notificationObj = {
        email : commentedPostData.data.userEmail,
        name : commentedUserdata.firstName,
        action : "commented on your post",
        url : frontendHost+`/post.html#${postid}`
    }
    await $.post(backendHost+"/notifications/addNewNotification", notificationObj);
    

}

//What is this bro?