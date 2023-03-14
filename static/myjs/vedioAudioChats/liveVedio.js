window.onload = async function(){
    let result = await validateUser();
    if(result.success == false){
        return;
    }
}


    
var socket = io(backendHost+'/chat')
let userData = JSON.parse(localStorage.getItem('userData'));

const videoGrid = document.getElementById('video-grid')
const myPeer = new Peer(undefined, {
    host: "18.224.56.154",
    port: '80'
})
const myVideo = document.createElement('video')
myVideo.muted = true

myPeer.on('open', id => {
    socket.emit('join-room', window.location.hash.substring(1), id,userData.email)
})


navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {

    if(window.location.hash.substring(1) == userData.email)
        addVideoStream(myVideo, stream)

    myPeer.on('call', call => {
        // if(window.location.href.substring(1)!=userData.email){
        //     alert("Vachindhi");
        // }
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

    call.on('close', () => {
        video.remove()
    })
}


function addVideoStream(video, stream) {
    video.srcObject = stream
    video.addEventListener('loadedmetadata', () => {
        video.play()
    })
    videoGrid.append(video)
}


socket.on('user-disconnected', userEmail=> {
    if(userEmail == window.location.hash.substring(1)){
        window.location.href='index.html'
    }    
})

$("#submitmsg").keypress(async (e)=>{
    let objt = {
        postText : $("#submitmsg").val()
    } 
    let purifiedText = await $.post(backendHost+"/xssScriptingFix/sanitizeDOM", objt);
    let puredText = purifiedText.cleanedDOM;

    if(e.which==13){
        let msg = puredText;
        socket.emit('livemsg',msg,userData.profilePic,userData.firstName);
        $("#submitmsg").val("");
    }
})


socket.on("getlivmsg",(msg,userId,profilePic,firstName)=>{
    $("#people-list").append(
        `<li style='background-color:#CAEF8EA6'>
            <figure>
                <img src="${profilePic}" alt="">
                <span class="status f-away"></span>
                
            </figure>
            <div class="friendz-meta">
                <a href="time-line.html">${msg}</a>
            </div>
        </li>`
    )
    let ele = document.getElementById("people-list");
    ele.scrollTop = ele.scrollHeight;
})



