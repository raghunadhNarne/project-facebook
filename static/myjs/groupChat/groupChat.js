let userData = JSON.parse(localStorage.getItem("userData"));

const socket = io("http://localhost:7777/chat")


let obj = {
    name:userData.firstName+" "+userData.lastName,
    email : userData.email,
    picture : userData.profilePic,
    roomname : window.location.hash.substring(1)
}

window.onload = async ()=>{
    let groupData = await $.post('http://localhost:7777/groups/getGroupInfo',{groupName:window.location.hash.substring(1)})
    console.log(groupData)
    let data = await $.post('http://localhost:7777/groupChats/fetchchating',{chatRoom : obj.roomname});
    data = data.data.messages;
    $("#groupname").html(groupData.data.groupName)
    $("#groupPic").attr('src',"../"+groupData.data.groupPic)
    for(x in data){
        appendToChat(data[x]);
    }
}


socket.emit("joinroom",obj)

socket.on("msg",obj=>{
    appendToChat(obj.message);
    let chatMessages = document.getElementById("chatarea")
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

function appendToChat(message){
    
    if(message.type!="message"){
        $("#chatarea").append(
            `
            <li class="you" style="margin-top:10px">
                <p style="width:40%;overflow-wrap: break-word;">${message.message}</p>
            </li>
            `
        )
    }
    else if(message.email == userData.email){
        $("#chatarea").append(
            `
            <li class="me" style="margin-top:10px">
                <figure><img src="images/resources/${message.picture}" alt=""></figure>
                <p style="width:40%;overflow-wrap: break-word;">${message.message}</p>
            </li>
            `
        )
    }
    else{
        $("#chatarea").append(
            `
            <li class="you" style="margin-top:10px">
                <figure><img src="images/resources/${message.picture}" alt=""></figure>
                <p style="width:40%;overflow-wrap: break-word;">${message.message}</p>
            </li>
            `
        )
    }
    let chatMessages = document.getElementById("chatarea")
    chatMessages.scrollTop = chatMessages.scrollHeight;
}



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
            roomname : window.location.hash.substring(1),
            message : puredText,
            type : "message"
        }
    }
    socket.emit("chatmsg",pobj);
    await $.post("http://localhost:7777/groupChats/putmessage",pobj);
    let chatMessages = document.getElementById("chatarea");
    chatMessages.scrollTop = chatMessages.scrollHeight;
    $("#msgtext").val("");
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

