let userData = JSON.parse(localStorage.getItem("userData"));


var obj;
const socket = io(backendHost+'/chat');
let friendPic="";

window.onload = async ()=> {
    let result = await validateUser();


    let obj = {
        email : userData.email
    }
    let myFriends = await $.post(backendHost+"/friends/getfriends",obj);
    appendMyFriends(myFriends.data);
}

async function appendMyFriends(arr){
    for(x in arr){
        let data = arr[x];
        if(data.senderEmail == userData.email){
            let friendData = await $.post(backendHost+"/users/getsingleuser",{email:data.receiverEmail});
            console.log(friendData)
            $("#messagebox").append(
                `<li onclick="changeurl('${data.receiverEmail}','${data.receiverName}','${data.receiverPic}','${friendData.data.onlineStatus}')">
                <figure>
                    <img src="${data.receiverPic}" onerror="this.onerror=null; this.src='../static/images/resources/defaultUser.png'" alt="Default Image">
                    <span class="status f-${friendData.data.onlineStatus}"></span>
                </figure>
                <div class="people-name">
                    <span style="font-weight:700">${data.receiverName}</span>
                </div>
            </li>`
            )
        }
        else{
            let friendData = await $.post(backendHost+"/users/getsingleuser",{email:data.receiverEmail});
            // console.log(friendData)
            $("#messagebox").append(
                `<li onclick="changeurl('${data.senderEmail}','${data.senderName}','${data.senderPic}','${friendData.data.onlineStatus}')">
                <figure>
                    <img src="${data.senderPic}" onerror="this.onerror=null; this.src='../static/images/resources/defaultUser.png'" alt="Default Image">
                    <span class="status f-${friendData.data.onlineStatus}"></span>
                </figure>
                <div class="people-name">
                    <span style="font-weight:700">${data.senderName}</span>
                </div>
            </li>`
            )
        }
        
    }
}

function changeurl(hash,name,pic,status){
    window.location.href="chat.html#"+hash;
    $("#makecall").attr('href','audioCall.html#'+userData.email+":"+hash);
    $("#frnd-name").html(name+`<i>${status}</i>`);
    $("#propic").attr('src',pic);
    $("#videoCall").attr('onclick',`connectVideocall("${hash}")`);
    socket.disconnect();
    socket.connect(backendHost+"")
    getChatOfSpecificuser(window.location.hash.substring(1))
    $("#mesg-box").css("display","inline-block")
}


async function getChatOfSpecificuser(friendsMail){
    let friendData = await $.post(backendHost+"/users/getsingleuser",{email:friendsMail});
    friendPic = friendData.data.profilePic;
    $("#chatarea").html("")
    let chatRoom = userData.email+":"+friendsMail;
    if(friendsMail<userData.email){
        chatRoom = friendsMail+":"+userData.email;
    }
    let data = await $.post(backendHost+'/chats/fetchchating',{chatRoom : chatRoom});
    data = data.data.messages;
    for(x in data){
        appendToChat(data[x]);
    }
    let chatMessages = document.getElementById("chatarea")
    chatMessages.scrollTop = chatMessages.scrollHeight;
    openSocket(friendsMail);
}

function appendToChat(message){

    if(message.email == userData.email){
        $("#chatarea").append(
            `
            <li class="me" style="margin-top:6px">
                <figure><img src="${userData.profilePic}" onerror="this.onerror=null; this.src='../static/images/resources/defaultUser.png'" alt="Default Image"></figure>
                <p style="width:40%;overflow-wrap: break-word;">${message.message}</p>
            </li>
            `
        )
    }
    else{
        $("#chatarea").append(
            `
            <li class="you" style="margin-top:6px">
                <figure><img src="${friendPic}" onerror="this.onerror=null; this.src='../static/images/resources/defaultUser.png'" alt="Default Image"></figure>
                <p style="width:40%;overflow-wrap: break-word;">${message.message}</p>
            </li>
            `
        )
    }
    let chatMessages = document.getElementById("chatarea")
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function openSocket(friendsMail){

    obj = {
        name:userData.firstName+" "+userData.lastName,
        email:userData.email,
        picture : userData.profilePic,
        time : "2:30pm",
        roomname : userData.email+":"+friendsMail
    }

    if(friendsMail<userData.email){
        obj.roomname=friendsMail+":"+userData.email;
    }
    socket.emit("joinroom",obj)
}

socket.on("msg",obj=>{
    appendToChat(obj.message);
})



$("#sendvoicemessage").click(()=>{

    const recognition = new webkitSpeechRecognition();
    recognition.interimResults = true;

    recognition.start();
    

    recognition.onresult = (event)=>{
        const transcript = event.results[0][0].transcript;
        $("#msgtext").val(transcript);
    }
})


$("#sendmessage").click(async (e)=>{
    e.preventDefault(); 
    let objt = {
        postText : $("#msgtext").val()
    }
    let purifiedText = await $.post(backendHost+"/xssScriptingFix/sanitizeDOM", objt);
    let puredText = purifiedText.cleanedDOM;
    let pobj = {
        chatRoom : obj.roomname,
        message : {
            name:userData.firstName+" "+userData.lastName,
            email:userData.email,
            picture : userData.profilePic,
            time : "2:30pm",
            roomname : obj.roomname,
            message : puredText,
            type : "message"
        }
    }
    socket.emit("chatmsg",pobj);
    await $.post(backendHost+"/chats/putmessage",pobj);
    let chatMessages = document.getElementById("chatarea")
    chatMessages.scrollTop = chatMessages.scrollHeight;
    $("#msgtext").val("")
})





async function connectVideocall(secondUserEmail){
    
    notificationObj = {
        email : secondUserEmail,
        name : JSON.parse(localStorage.getItem("userData")).firstName,
        action : "is Calling you",
        url : frontendHost+`/videoCall.html#${JSON.parse(localStorage.getItem("userData")).email}`
    }
    let result = await $.post(backendHost+"/notifications/addNewNotification", notificationObj);
    if(result.success == true)
        window.location.href = `videoCall.html#${secondUserEmail}`
}