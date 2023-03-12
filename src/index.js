const express = require('express')
const cors = require('cors');
require('dotenv').config();



const app = express();


app.use(express.urlencoded());
app.use(express.json());
app.use(cors())






const socketio = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = socketio(server, { cors: {} });





// io.on('connection', socket => {



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
      // chat.to(obj.roomname).emit('msg', extroobj);
    })

  })

})






const videoCall = io.of('/videoCall');
videoCall.on('connection', socket => {
  socket.on('join-room', (roomName, userId) => {
    // console.log("roomName",roomName)
    socket.join(roomName)
    socket.broadcast.to(roomName).emit('user-connected', userId)

    socket.on('disconnect', () => {
      socket.broadcast.to(roomName).emit('user-disconnected', userId)
    })
  })
})







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










app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

const { upload } = require('./multer/multerConfig');

// const authRouter = require('./auth/authRoute');
// app.use('/auth',authRouter);


app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


// const authRouter = require('./auth/authRoute');
// app.use('/auth',authRouter);




const signupRouter = require("./routes/signupRoute");
app.use('/signup', signupRouter);

const loginRouter = require('./routes/loginRoute');
app.use('/login', loginRouter)

const groupRouter = require("./routes/groupRoute");
app.use("/groups", groupRouter)

const postRouter = require('./routes/postRoute');
app.use('/post', postRouter);


const chatRouter = require('./routes/chatRoute');
app.use("/chats", chatRouter);


const friendsRouter = require('./routes/friendsRoute')
app.use('/friends', friendsRouter)

const userRouter = require('./routes/userRoute')
app.use('/users', userRouter)

const grouChatRouter = require('./routes/groupChatRoute')
app.use("/groupChats", grouChatRouter);
const indexRouter = require('./routes/indexRoute');
app.use('/index', indexRouter);

const recentActivityRouter = require('./routes/recentActivityRoute');
app.use('/recentActivity', recentActivityRouter)


const xssScriptingFixRouter = require('./routes/xssScriptingFixRoute');
const { createCipheriv } = require('crypto');
app.use('/xssScriptingFix', xssScriptingFixRouter)

const adRouter = require('./routes/adRoute')
app.use('/ads',adRouter)

const notificationsRouter = require('./routes/notificationsRoute');
app.use('/notifications',notificationsRouter)


async function auth(req, res, next) {
  var token = req.cookies.jwtToken;
  console.log("here", token)
  if (!token) {
    return res.redirect('http://127.0.0.1:5500/static/404.html');
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, decoded) {
    if (err) {
      return res.redirect('http://127.0.0.1:5500/static/404.html');
    }
    if (decoded.role != 'user') {
      return res.redirect('/404.html');
    }
    //   console.log("user verified")
    req.userData = decoded;
    next();
  });
}




// const { Configuration, OpenAIApi } = require("openai");

// const configuration = new Configuration({
//   apiKey: process.env.OPEN_API_SECRET_KEY,
// });
// const openai = new OpenAIApi(configuration);
// async function xyz(){
//   const response = await openai.createImage({
//     prompt: "india independence day",
//     n: 1,
//     size: "512x512",
//   });
//   console.log(response.data.data)
//   // console.log(completion.data.choices[0].message);
// }
// xyz()


// server.listen(7007,()=>{console.log("connected ")})
server.listen(7777,()=>{console.log("Connected to port 7777")})
