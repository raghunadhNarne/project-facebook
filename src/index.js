const express = require('express')
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors({}))

const socketio = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const io = socketio(server, {cors: {}});
module.exports = {io}
require('./socket/socket')


// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });


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

const mediaRouter = require('./routes/mediaRoute');
app.use('/media',mediaRouter)


server.listen(7777,()=>{console.log("Connected to port 7777")})