const mongoose=require("./conn").mongoose;


//defining user schema
let userSchema = {
    firstName : {type:String},
    lastName : {type:String},
    dob : {type:String},
    age : {type:Number},
    gender : {type:String},
    email : {type:String},
    mobileNo : {type:String},
    password : {type:String},
    city : {type:String},
    country : {type:String},
    aboutMe : {type:String},
    role : {type:String},
    status : {type:String},
    profilePic : {type:String},
    coverPic : {type:String},
    facebookLink : {type:String},
    twitterLink : {type:String},
    googleLink : {type:String},
    children:{type:Array},
    status:{type:String},
    authfile:{type:String},
    requested:{type:String},
    onlineStatus : {type:String}

}


//creating user model
let userModel = mongoose.model("users",userSchema);


module.exports = {userModel};