userData = JSON.parse(localStorage.getItem("userData"))


async function renderMyFriends(){
    let myFriends = await getFriends();
    
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
    
    let myFriends = [];
    try{
        myFriends = await $.post(backendHost+"/friends/getfriends",obj)
    }
    catch(e){
        console.log("My friends widget rendering failed...")
    }
    return myFriends?.data || [];
}



async function renderFriend(friend){
    let currentUserData = await getCurrentUserData(friend.senderEmail ==  userData.email ? friend.receiverEmail : friend.senderEmail);
    return `
            <li>
            <figure>
            <img src="${friend.senderEmail === userData.email ? friend.receiverPic : friend.senderPic}" onerror="this.onerror=null; this.src='../static/images/resources/defaultUser.png'" alt="Default Image">
            <span class="status f-${currentUserData.onlineStatus}"></span>
            </figure>
            <div class="friendz-meta">
                <a href = "chat.html"> ${friend.senderEmail ==  userData.email ? friend.receiverName : friend.senderName }</a>
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
        result = await $.post(backendHost+"/users/getsingleuser",obj)
        if(result.success)
            currentUserData = result.data
        else
            console.log(result.message)
    }
    catch(e){
        console.log("failed to get user data");
    }
    
    return currentUserData;
}

renderMyFriends();