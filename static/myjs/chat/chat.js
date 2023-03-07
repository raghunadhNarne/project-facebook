var socket = io('http://localhost:7777');



let obj = {
    name:"Rohith",
    email:"rohith@gmail.com",
    picture : "rohithsharma.jpg",
    time : "2:30pm",
    roomname : "rohith@gmail.com"+":"+"raghu@gmail.com"
}

socket.emit("joinroom",obj)

socket.on("msg",msg=>{
    console.log(msg);
})



$("#sendmessage").click((e)=>{
    e.preventDefault();
    let obj = {
        name:"Rohith",
        email:"rohith@gmail.com",
        picture : "rohithsharma.jpg",
        time : "2:30pm",
        roomname : "rohith@gmail.com"+":"+"raghu@gmail.com",
        message : $("#msgtext")
    }
    socket.emit("chatmsg",obj);
})


// <li class="you">
// 														<figure><img src="images/resources/userlist-2.jpg" alt=""></figure>
// 														<p>what's liz short for? :)</p>
// 													</li>