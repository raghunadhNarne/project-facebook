const mongoose = require("./conn").mongoose;

let postSchema = {
    userEmail: { type: String },
    userName: { type: String },
    userPic: { type: String },
    postedTime: { type: Date },
    postText: { type: String },
    postImage: { type: String },
    postVideo: { type: String },
    postType: { type: String },
    comments: [],
    likedUsers: [],
    dislikedUsers: [],
    groupName: { type: String },
    status: {type: String}
}

let postModel = mongoose.model("posts", postSchema);


module.exports = { postModel };