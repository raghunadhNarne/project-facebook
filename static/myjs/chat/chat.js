var socket = io('http://localhost:7777');


let obj = {
    name:"Rohith",
    email:"rohith@gmail.com",
    picture : "rohithsharma.jpg",
    time : "2:30pm",
    roomname : "rohith@gmail.com"+":"+"raghu@gmail.com"
}

window.onload = async ()=>{
    let data = await $.post('http://localhost:7777/chats/fetchchating',{chatRoom : obj.roomname});
    data = data.data.messages;
    
    for(x in data){
        appendToChat(data[x]);
    }
}


socket.emit("joinroom",obj)

socket.on("msg",obj=>{
    appendToChat(obj.message);
})

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
    else if(message.email == 'rohith@gmail.com'){
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



$("#sendmessage").click(async (e)=>{
    e.preventDefault();
    let pobj = {
        chatRoom : obj.roomname,
        message : {
            name:"Raghu",
            email:"rohith@gmail.com",
            picture : "rohithsharma.jpg",
            time : "2:30pm",
            roomname : "rohith@gmail.com"+":"+"raghu@gmail.com",
            message : $("#msgtext").val(),
            type : "message"
        }
    }
    socket.emit("chatmsg",pobj);
    await $.post("http://localhost:7777/chats/putmessage",pobj);
    let chatMessages = document.getElementById("chatarea")
    chatMessages.scrollTop = chatMessages.scrollHeight;
    $("#msgtext").val("")
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

