let userData = JSON.parse(localStorage.getItem("userData"));


var obj;
const socket = io('http://localhost:7777/chat');


window.onload = async ()=> {

    let obj = {
        email : userData.email
    }
    let myFriends = await $.post("http://localhost:7777/friends/getfriends",obj);
    appendMyFriends(myFriends.data);
}

function appendMyFriends(arr){
    for(x in arr){
        let data = arr[x];
        if(data.senderEmail == userData.email){
            $("#messagebox").append(
                `<li onclick="changeurl('${data.receiverEmail}','${data.receiverName}','${data.receiverPic}')">
                <figure>
                    <img src="../${data.receiverPic}" alt="">
                    <span class="status f-online"></span>
                </figure>
                <div class="people-name">
                    <span style="font-weight:700">${data.receiverName}</span>
                </div>
            </li>`
            )
        }
        else{
            $("#messagebox").append(
                `<li onclick="changeurl('${data.senderEmail}','${data.senderName}','${data.senderPic}')">
                <figure>
                    <img src="../${data.senderPic}" alt="">
                    <span class="status f-online"></span>
                </figure>
                <div class="people-name">
                    <span style="font-weight:700">${data.senderName}</span>
                </div>
            </li>`
            )
        }
        
    }
}

function changeurl(hash,name,pic){
    window.location.href="chat.html#"+hash;
    $("#frnd-name").html(name);
    $("#propic").attr('src',pic);
    socket.disconnect();
    socket.connect("http://localhost:7777")
    getChatOfSpecificuser(window.location.hash.substring(1))
    $("#mesg-box").css("display","inline-block")
}


async function getChatOfSpecificuser(friendsMail){
    $("#chatarea").html("")
    let chatRoom = userData.email+":"+friendsMail;
    if(friendsMail<userData.email){
        chatRoom = friendsMail+":"+userData.email;
    }
    let data = await $.post('http://localhost:7777/chats/fetchchating',{chatRoom : chatRoom});
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
                <figure><img src="../${message.picture}" alt=""></figure>
                <p style="width:40%;overflow-wrap: break-word;">${message.message}</p>
            </li>
            `
        )
    }
    else{
        $("#chatarea").append(
            `
            <li class="you" style="margin-top:6px">
                <figure><img src="../${message.picture}" alt=""></figure>
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
    let purifiedText = await $.post("http://localhost:7777/xssScriptingFix/sanitizeDOM", objt);
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
    await $.post("http://localhost:7777/chats/putmessage",pobj);
    let chatMessages = document.getElementById("chatarea")
    chatMessages.scrollTop = chatMessages.scrollHeight;
    $("#msgtext").val("")
})




