const express = require('express')
const cors = require('cors');
require('dotenv').config();



const app = express();


app.use(express.urlencoded());
app.use(express.json());
app.use(cors())


const { upload } = require('./multer/multerConfig');

const signupRouter = require("./routes/signupRoute");
app.use('/signup',signupRouter);

const loginRouter = require('./routes/loginRoute');
app.use('/login',loginRouter)

const groupRouter = require("./routes/groupRoute");
app.use("/groups",groupRouter)

const postRouter = require('./routes/postRoute');
app.use('/post',postRouter);

const friendsRouter=require('./routes/friendsRoute')
app.use('/friends',friendsRouter)



app.listen(7777,()=>{console.log("Connected to port 7777")});
