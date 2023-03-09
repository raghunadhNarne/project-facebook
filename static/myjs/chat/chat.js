let userData = JSON.parse(localStorage.getItem("userData"));




var obj;
const socket = io('http://localhost:7777');


window.onload = async ()=> {

    let obj = {
        email : userData.email
    }
    let myFriends = await $.post("http://localhost:7777/friends/getfriends",obj);
    appendMyFriends(myFriends.data);
    getChatOfSpecificuser(window.location.hash.substring(1))
}

function appendMyFriends(arr){
    for(x in arr){
        let data = arr[x];
        if(data.senderEmail == userData.email){
            $("#messagebox").append(
                `<li onclick="changeurl('${data.receiverEmail}')">
                <figure>
                    <img src="images/resources/${data.receiverPic}" alt="">
                    <span class="status f-online"></span>
                </figure>
                <div class="people-name">
                    <span>${data.receiverName}</span>
                </div>
            </li>`
            )
        }
        else{
            $("#messagebox").append(
                `<li onclick="changeurl('${data.senderEmail}')">
                <figure>
                    <img src="images/resources/${data.senderPic}" alt="">
                    <span class="status f-online"></span>
                </figure>
                <div class="people-name">
                    <span>${data.senderName}</span>
                </div>
            </li>`
            )
        }
        
    }
}

function changeurl(hash){
    window.location.href="chat.html#"+hash;
    window.location.reload();
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
    openSocket(friendsMail);
}

function appendToChat(message){

    if(message.type!="message"){
        $("#chatarea").append(
            `
            <li class="you" style="margin:10px">
                <p>${message.message}</p>
            </li>
            `
        )
    }
    else if(message.email == userData.email){
        $("#chatarea").append(
            `
            <li class="me" style="margin:10px">
                <figure><img src="images/resources/${message.picture}" alt=""></figure>
                <p>${message.message}</p>
            </li>
            `
        )
    }
    else{
        $("#chatarea").append(
            `
            <li class="you" style="margin:10px">
                <figure><img src="images/resources/${message.picture}" alt=""></figure>
                <p>${message.message}</p>
            </li>
            `
        )
    }
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
    console.log(1000);
    appendToChat(obj.message);
})



console.log(userData);


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
    let pobj = {
        chatRoom : obj.roomname,
        message : {
            name:userData.firstName+" "+userData.lastName,
            email:userData.email,
            picture : userData.profilePic,
            time : "2:30pm",
            roomname : obj.roomname,
            message : $("#msgtext").val(),
            type : "message"
        }
    }
    console.log(obj);
    socket.emit("chatmsg",pobj);
    await $.post("http://localhost:7777/chats/putmessage",pobj);
    let chatMessages = document.getElementById("chatarea")
    chatMessages.scrollTop = chatMessages.scrollHeight;
    $("#msgtext").val("")
})




