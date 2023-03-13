async function renderMyNotifications(){
    let notifications = await getNotifications();
    // console.log(notifications,"0000");



    for(let i = notifications.length - 1; i >= 0; i--)
    {
        let notification = notifications[i];

        // if(notification.action == "like")
        //     notificationText = "liked your post"
        // else if(notification.action == "dislike")
        //     notificationText = "disliked your post"
        // else if(notification.action == "comment")
        //     notificationText = "commented on your post"
        // else if(notification.action == "post")
        //     notificationText = "posted on tinku"   
        // else if(notification.action == "friend")
        //     notificationText = "accepted your friend request"
        // else if(notification.action == "unfriend")
        //     notificationText = "removed you from their friend list"  


        $("#notifications").append(
            `<li id="${i}li">
                <figure><img src="${notification.userPic}" onerror="this.onerror=null; this.src='../static/images/resources/defaultUser.png'" alt="Default Image"></figure>
                <div class="notifi-meta">
                    <p>${notification.name} <a href="${notification.url}">${notification.action}</a></p>
                    <span>${notification.timeStamp}</span>
                </div>
                <i class="del fa fa-close" onClick = "removeNotification(this,'${i}')"></i>
            </li>`
        )        
    }
    
}
//onClick = "removeNotification('${notification._id}')"


async function getNotifications(){
    obj = {
        email: JSON.parse(localStorage.getItem("userData")).email
    }
    // console.log(obj);
    let result = await $.post(backendHost+"/notifications/getMyNotifications", obj);

    let myNotifications = result.data;
    
    // console.log(recentActivityData.activities,"recentActivityData")

    return myNotifications?.notifications ? myNotifications.notifications : [];
}


async function removeNotification(event,arrayIndex){
    let listItem = document.getElementById(`${arrayIndex}li`)
    listItem.style.display = "none";

    obj = {
        arrayIndex,
        email : JSON.parse(localStorage.getItem("userData")).email
    }
    $.post(backendHost+"/notifications/deleteNotification",obj)
}
async function start(){
    let result = await validateUser();
    if(result.success == false){
        alert(result.message)
        window.location.href = "login.html"
        return;
    }
    renderMyNotifications()
}
start()