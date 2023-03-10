userData = JSON.parse(localStorage.getItem("userData"))


async function renderMyFriends(){
    let myFriends = await getFriends();
    // console.log(myFriends,"myFriends")


    for(let friend of myFriends){
        $("#people-list").append(
            await renderFriend(friend)
        )
    }
}



async function getFriends(){
    var obj={
        email : userData.email,
    }
    let myFriends = await $.post("http://localhost:7777/friends/getfriends",obj)
    return myFriends.data;
}



async function renderFriend(friend){
    let currentUserData = await getCurrentUserData(friend.senderEmail ==  userData.email ? friend.receiverEmail : friend.senderEmail);
    // console.log("currentUserData.onlineStatus",currentUserData)
    return `
            <li>
            <figure>
            <img src="${friend.senderEmail === userData.email ? friend.receiverPic : friend.senderPic}" onerror="this.onerror=null; this.src='../static/images/resources/defaultUser.png'" alt="Default Image">
            <span class="status f-${currentUserData.onlineStatus}"></span>
            </figure>
            <div class="friendz-meta">
                <a href = "#"> ${friend.senderEmail ==  userData.email ? friend.receiverName : friend.senderName }</a>
                <i><a href = "mailto:${friend.senderEmail ==  userData.email ? friend.receiverEmail : friend.senderEmail}">Email</a></i>
            </div>
        </li>`
}


async function getCurrentUserData(email){
    let currentUserData = {};
    try{
        var obj={
            email : email,
        }
        result = await $.post("http://localhost:7777/users/getsingleuser",obj)
        if(result.success)
            currentUserData = result.data
        else
            console.log(result.message)
        // console.log("currentUserData",currentUserData)
    }
    catch(e){
        console.log("failed to get user data");
    }
    
    return currentUserData;
}

renderMyFriends();