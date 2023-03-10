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
    obj = {
        email: JSON.parse(localStorage.getItem("userData")).email
    }
    let result = await $.post("http://localhost:7777/friends/getmyfollowers", obj);
    // console.log("result",result)

    let followersData = result.data;

    return followersData ? followersData : [];
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
    let data = await $.post("http://localhost:7777/friends/acceptpendingfriendrequest",{senderEmail:senderEmail,receiverEmail:receiverEmail})
    alert("succesfully accepted the request")
}


renderWhosFollowingWidget();