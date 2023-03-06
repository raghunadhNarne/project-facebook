const express = require('express')
const cors = require('cors');
require('dotenv').config();
const { upload } = require('./multer/multerConfig');



const app = express();


app.use(express.urlencoded());
app.use(express.json());
app.use(cors())


app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

// const authRouter = require('./auth/authRoute');
// app.use('/auth',authRouter);

const signupRouter = require("./routes/signupRoute");
app.use('/signup',signupRouter);

const loginRouter = require('./routes/loginRoute');
app.use('/login',loginRouter)

const groupRouter = require("./routes/groupRoute");
app.use("/groups",groupRouter)

const postRouter = require('./routes/postRoute');
app.use('/post',postRouter);



app.listen(7777,()=>{console.log("Connected to port 7777")});