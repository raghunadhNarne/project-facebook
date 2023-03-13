let mails=window.location.hash.substring(1).split(":")
// alert(mails)
callfrom=mails[0]
callto=mails[1]

$("#callingtext").text(`calling to ${callto}`)
var userData = JSON.parse(localStorage.getItem("userData"))

window.onload = async()=>{

    notificationObj = {
        email : callto,
        name : '',
        action : "Lift call from "+callfrom,
        url : frontendHost+`/audioCall.html#${callfrom}:${callto}`
    }
    // console.log(notificationObj)

    if(userData.email==callfrom)
    await $.post(backendHost+"/notifications/addNewNotification", notificationObj);
}



const socket = io(backendHost+'/audioCall')
const videoGrid = document.getElementById('video-grid')

const myPeer = new Peer(undefined, {
  host: "18.224.56.154",
  port: '80'
})

const myVideo = document.createElement('video')
myVideo.muted = true
const peers = {}
navigator.mediaDevices.getUserMedia({
  // video: true,
  audio: true
}).then(stream => {
  addVideoStream(myVideo, stream)

  myPeer.on('call', call => {
    console.log("call connected");
    call.answer(stream)
    const video = document.createElement('video')
    call.on('stream', userVideoStream => {
      addVideoStream(video, userVideoStream)
    })
  })
  
  socket.on('audiocall-connected', userId => {
    console.log("audiocall-connected",userId)
    $("#callingtext").text(`call lifted by ${callto}`)
    connectToNewUser(userId, stream)
  })
})

socket.on('audiocall-disconnected', userId => {
  window.location.href='chat.html';
    $("#callingtext").text(`call ended`)
  if (peers[userId]) peers[userId].close()
  const video = document.createElement('video')
  video.remove()
})

myPeer.on('open', id => {
  let myEmail = callfrom;

  let friendEmail = callto;
  let roomName = myEmail < friendEmail ? myEmail + friendEmail : friendEmail + myEmail
  socket.emit('join-call-room', roomName, id)
})

function connectToNewUser(userId, stream) {
  // console.log("newUser",userId);
  const call = myPeer.call(userId, stream)
  console.log(call)
  const video = document.createElement('video')
  call.on('stream', userVideoStream => {
    addVideoStream(video, userVideoStream)
  })

  peers[userId] = call
}

function addVideoStream(video, stream) {
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })
  videoGrid.append(video)
}