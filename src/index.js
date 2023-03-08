const express = require('express')
const cors = require('cors');
require('dotenv').config();



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


const indexRouter = require('./routes/indexRoute');
app.use('/index',indexRouter);


// let userRoutes = ["/login"];

async function auth(req,res,next){
    var token = req.cookies.jwtToken;
    console.log("here",token)
    if (!token) {
      return res.redirect('http://127.0.0.1:5500/static/404.html');
    }
  
    jwt.verify(token, process.env.JWT_SECRET_KEY, function(err, decoded) {
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
app.listen(7777,()=>{console.log("Connected to port 7777")})
