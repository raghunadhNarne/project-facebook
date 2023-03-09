const mongoose = require("./conn").mongoose;

let postSchema = {
    postId : {type : Number},
    userEmail : {type : String},
    userName : {type : String},
    userPic : {type : String},
    postedTime : {type : Date},
    postText : {type : String},
    postImage : {type : String},
    postVideo : {type : String},
    postType : {type : String},
    comments : [],
    likedUsers : [],
    dislikedUsers : []
}

let postModel = mongoose.model("posts",postSchema);


module.exports = {postModel};