const socket = io('http://localhost:7777/videoCall')
// const videoGrid = document.getElementById('video-grid')


const myPeer = new Peer(undefined, {
  host: 'localhost',
  port: '6747'
})

const myVideo = document.createElement('video')
myVideo.muted = true
const peers = {}
navigator.mediaDevices.getUserMedia({
  video: true,
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
  
  socket.on('user-connected', userId => {
    console.log("user-connected",userId)
    connectToNewUser(userId, stream)
  })
})

socket.on('user-disconnected', userId => {
  if (peers[userId]) peers[userId].close()
  const video = document.createElement('video')
  video.remove()
})

myPeer.on('open', id => {
  let myEmail = JSON.parse(localStorage.getItem("userData")).email;
  let friendEmail = window.location.hash.substring(1);
  let roomName = myEmail < friendEmail ? myEmail + friendEmail : friendEmail + myEmail
  socket.emit('join-room', roomName, id)
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
  video.style.width = "100%"
  video.style.height = "500px"
  let videoDiv = $('<div class="col-lg-5" style="background-color: black;"></div>').append(video)
  $("#video-grid").append(videoDiv)
}