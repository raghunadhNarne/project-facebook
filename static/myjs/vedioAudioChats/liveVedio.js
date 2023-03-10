var socket = io('http://localhost:7777')
let userData = JSON.parse(localStorage.getItem('userData'));


const videoGrid = document.getElementById('video-grid')
const myPeer = new Peer(undefined, {
    host: '/',
    port: '3101'
})
const myVideo = document.createElement('video')
myVideo.muted = true

myPeer.on('open', id => {
    socket.emit('join-room', window.location.hash.substring(1), id)
})


navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {

    if(window.location.hash.substring(1) == userData.email)
        addVideoStream(myVideo, stream)

    myPeer.on('call', call => {
        if(window.location.href.substring(1)!=userData.email){
            alert("Vachindhi");
        }
        call.answer(stream)
        const video = document.createElement('video')
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream)
        })
    })

    socket.on('user-connected', userId => {
        if(window.location.hash.substring(1) == userData.email){
            connectToNewUser(userId, stream);
        }
    })
})


function connectToNewUser(userId, stream) {
    const call = myPeer.call(userId, stream)

    // const video = document.createElement('video')
    // call.on('stream', userVideoStream => {
    //     addVideoStream(video, userVideoStream)
    // })

    // call.on('close', () => {
    //     video.remove()
    // })
}


function addVideoStream(video, stream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
    videoGrid.append(video)
}


socket.on('user-disconnected', userId => {
    console.log(userId + ":Disconnected")
})

$("#submitmsg").keypress((e)=>{
    if(e.which==13){
        let msg = $("#submitmsg").val();
        socket.emit('livemsg',msg);
        $("#submitmsg").val("");
    }
})


socket.on("getlivmsg",(msg,userId)=>{
    $("#people-list").append(
        `<li>
            <figure>
                <img src="images/resources/friend-avatar2.jpg" alt="">
                <span class="status f-away"></span>
            </figure>
            <div class="friendz-meta">
                <a href="time-line.html">${msg}</a>
            </div>
        </li>`
    )
    console.log(userId+"Sent a message : +"+msg);
})