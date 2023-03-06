var express=require('express')
var app=express()
require('dotenv').config();
app.use(express.urlencoded())
app.use(express.json())

var cors=require('cors')
app.use(cors())

var cookieParser=require('cookie-parser')
app.use(cookieParser())


const signupRouter = require("./routes/signupRoute");
app.use('/signup',signupRouter);

const loginRouter = require('./routes/loginRoute');
app.use('/login',loginRouter)

const friendsRouter=require('./routes/friendsRoute')
app.use('/friends',friendsRouter)

app.listen(3333,()=>console.log("server listening at 3333"))
