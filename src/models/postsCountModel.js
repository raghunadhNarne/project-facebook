const mongoose = require("./conn").mongoose;

let postsCountSchema = {
    totalPostsCount : {type : Number}
}

let postCountModel = mongoose.model("totalPostscount",postsCountSchema);


module.exports = {postCountModel};