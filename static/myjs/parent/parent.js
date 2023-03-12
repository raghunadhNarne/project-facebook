window.onload=async function(){
    // alert('jljl')
    obj = {
        email: JSON.parse(localStorage.getItem("userData")).email,
        children:JSON.parse(localStorage.getItem("userData")).children
    }
    let pending_posts = await $.post(backendHost+"/index/getmychildrenpendingposts", obj);
    // alert(pending_posts)
    console.log(pending_posts)
    addpendingpostsdata(pending_posts.data,obj);
}
$("#addchildren").click(async ()=>{
    var firstname=$("#firstname").val()
    var lastname=$("#lastname").val()
    var email=$("#email").val()
    var password=$("#password").val()
    var dob=$("#dob").val()
    var gender=$("input[type='radio'][name='radio']:checked").val();
    var parent=JSON.parse(localStorage.getItem("userData")).email
    
    dob = new Date(dob);
    var month_diff = Date.now() - dob.getTime();
    var age_dt = new Date(month_diff);
    var year = age_dt.getUTCFullYear();
    var age = Math.abs(year - 1970);
    
    var obj={
        firstName:firstname,
        lastName:lastname,
        email:email,
        password:password,
        dob:$("#dob").val(),
        gender:gender,
        age:age,
        parent:parent
    }

    await postchilddata(obj)

})

async function postchilddata(obj)
{
    let data = await $.post(backendHost+"/users/addchild",obj);
    alert("successfully posted child data")
}

async function addpendingpostsdata(posts,obj)
{
    for(x in posts)
    {
        let post = posts[x];
        if(post.postType =="text")
        {
            $("#posts").append(
                `<div class="user-post" style="padding-bottom:5%;background-color: white;padding: 5%;margin: 2%;">
                <div class="friend-info">
                        <figure>
                        <img src="../${post.userPic}" alt="">
                    </figure>
                    <div class="friend-name">
                        <ins><a href="time-line.html" title="">${post.userName}</a></ins>
                        <span>published: june,2 2018 19:PM</span>
                    </div>
                    <div class="post-meta">
                        
                        <div class="description">
                            
                            <p>
                            ${post.postText}
                            </p>
                        </div>
                        <div class="pepl-info">
                            <a href="#" title="" class="add-butn more-action" data-ripple="" onclick="deleterequest('${post.userEmail}')">Reject</a>
                            <a href="#" title="" class="add-butn" data-ripple="" onclick="confirmrequest('${post.userEmail}')">Accept</a>
                        </div>
                    </div>
                </div>
    
            </div>`
            )
        }
        else if (post.postType=="image")
        {
            $("#posts").append(
                `<div class="user-post" style="padding-bottom:5%;background-color: white;padding: 5%;margin: 2%;">
                <div class="friend-info">
                    <figure>
                        <img src="../${post.userPic}" alt="">
                    </figure>
                    <div class="friend-name">
                        <ins><a href="time-line.html" title="">Janice Griffith</a></ins>
                        <span>published: june,2 2018 19:PM</span>
                    </div>
                    <div class="post-meta">
                        <img src="../${post.postImage}" alt="">
                        
                        <div class="description">
                            
                            <p>
                            ${post.postText}
                            </p>
                        </div>
                        <div class="pepl-info">
                            <a href="#" title="" class="add-butn more-action" data-ripple="" onclick="deleterequest('${post.userEmail}')">Reject</a>
                            <a href="#" title="" class="add-butn" data-ripple="" onclick="confirmrequest('${post.userEmail}')">Accept</a>
                        </div>
                    </div>
                </div>
    
            </div>`
            )

        }
        else
        {
            $("#posts").append(
                `<div class="user-post" style="padding-bottom:5%;background-color: white;padding: 5%;margin: 2%;">
                <div class="friend-info">
                    <figure>
                        <img src="../${post.userPic}" alt="">
                    </figure>
                    
                    <div class="friend-name">
                        <ins><a href="time-line.html" title="">Janice Griffith</a></ins>
                        <span>published: june,2 2018 19:PM</span>
                    </div>
                    <div class="post-meta">
                        <video width="100%" height="400px" controls loop>  
                                <source src="../${post.postVideo}" type="video/mp4">  
                                <source src="../${post.postVideo}" type="video/webm">
                                <source src="../${post.postVideo}" type="video/ogg">
                                Your browser does not support the html video tag.  
                            </video> 
                        <div class="description">
                            
                            <p>
                            ${post.postText}
                            </p>
                        </div>
                        <div class="pepl-info">
                            <a href="#" title="" class="add-butn more-action" data-ripple="" onclick="deleterequest('${post.userEmail}')">Reject</a>
                            <a href="#" title="" class="add-butn" data-ripple="" onclick="confirmrequest('${post.userEmail}')">Accept</a>
                        </div>
                    </div>
                </div>
    
            </div>`
            )
        }
        
    }
}

async function confirmrequest(email)
{
    console.log(email)
    let data = await $.post(backendHost+"/index/acceptpendingchildpost",{email:email})
    alert(data.message)
}

async function deleterequest(email)
{
    let data = await $.post(backendHost+"/index/deletependingchildpost",{email:email})
    alert(data.message)
}