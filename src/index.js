const express = require('express')
const cors = require('cors');



const app = express();


app.use(express.urlencoded());
app.use(express.json());
app.use(cors())


const signupRouter = require("./routes/signupRoute");
app.use('/signup',signupRouter);

const loginRouter = require('./routes/loginRoute');
app.use('/login',loginRouter)




app.listen(7777,()=>{console.log("Connected to port 7777")});