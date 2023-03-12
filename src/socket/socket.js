const { io } = require("..")


//socket for live video
const chat = io.of('/chat')
chat.on('connection', socket => {
  socket.on('join-room', (roomId, userId,email) => {
    socket.join(roomId)
    socket.broadcast.to(roomId).emit('user-connected', userId)
    socket.on('disconnect', () => {
      socket.broadcast.to(roomId).emit('user-disconnected', email)
    })
    socket.on('livemsg',(livemsg,profilePic,firstName)=>{
      chat.to(roomId).emit('getlivmsg',livemsg,userId,profilePic,firstName);
    })
  })

  socket.on('joinroom', (obj) => {
    socket.join(obj.roomname);

    let introobj = {
      chatRoom: obj.roomname,
      message: {
        message: `${obj.name} entered the chat`,
        type: "into"
      }
    }

    let extroobj = {
      chatRoom: obj.roomname,
      message: {
        message: `${obj.name} left the chat`,
        type: "extro"
      }
    }
    socket.broadcast.to(obj.roomname).emit("intromsg", introobj);

    socket.on('chatmsg', msgobj => {
      chat.to(obj.roomname).emit('msg', msgobj);
    })

    socket.on('disconnect', socket => {
      chat.to(obj.roomname).emit('extromsg', extroobj);
    })
  })
})



//socket for video calls
const videoCall = io.of('/videoCall');
videoCall.on('connection', socket => {
  socket.on('join-room', (roomName, userId) => {
    socket.join(roomName)
    socket.broadcast.to(roomName).emit('user-connected', userId)
    socket.on('disconnect', () => {
      socket.broadcast.to(roomName).emit('user-disconnected', userId)
    })
  })
})


//socket for audio calls
const audioCall = io.of('/audioCall');
audioCall.on('connection', socket => {
  socket.on('join-call-room', (roomName, userId) => {
    socket.join(roomName)
    socket.broadcast.to(roomName).emit('user-connected', userId)
    socket.on('disconnect', () => {
      socket.broadcast.to(roomName).emit('user-disconnected', userId)
    })
  })
})
