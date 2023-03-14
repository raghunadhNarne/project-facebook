async function renderWhosFollowingWidget(){
    let myFollowers = await getFollowers();

    $("#followers").html("")
    for(let follower of myFollowers){
        $("#followers").append(
            await getFollower(follower)
        )
    }
}



async function getFollowers(){
    let result = [];
    try{
        obj = {
            email: JSON.parse(localStorage.getItem("userData")).email
        }
        result = await $.post(backendHost+"/friends/getmyfollowers", obj);
    }
    catch(e){
        console.log("Whos following widet rendering failed...")
    }
    let followersData = result?.data || [];

    return followersData;
}

async function getFollower(follower){
    return `
        <li>
            <figure><img src="${follower.senderPic}" onerror="this.onerror=null; this.src='../static/images/resources/defaultUser.png'" alt="Default Image"></figure>
            <div class="friend-meta">
                <h4><a href="#" title="">${follower.senderName}</a></h4>
                <a href="javascript:confirmRequest('${follower.senderEmail}');" title="" class="underline">Add Friend</a>
            </div>
        </li>`
}

async function confirmRequest(senderEmail)
{
    let receiverEmail = JSON.parse(localStorage.getItem("userData")).email  //my email
    let data = await $.post(backendHost+"/friends/acceptpendingfriendrequest",{senderEmail:senderEmail,receiverEmail:receiverEmail})
    Swal.fire({
        icon: 'success',
        title: "succesfully accepted the request",
        
        showConfirmButton: false, 
        allowOutsideClick: false, 
        timer:1500
        
      });
}


renderWhosFollowingWidget();