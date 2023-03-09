const { postModel } = require("../models/postModel");

async function fetchMyPosts(email){
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try{
        let posts = await postModel.find({ userEmail: email});
        if(posts.length != 0){
            result.success = true;
            result.message = "Fetched posts";
            result.data = posts;
        }
        else{
            result.message = "No posts till now";
        }
    }
    catch(e){
        result.message = "Failed to fetch posts";
    }
    return result;
}



async function addUserToLikedArray(email,postid){
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try{
        let updateResult = await postModel.updateOne({postId:postid},{$push:{likedUsers:email}});
        if(updateResult.modifiedCount != 0){
            result.success = true;
            result.message = "Added user to liked list";
            result.data = "";
        }
        else{
            result.message = "Addeding user to liked list failed";
        }
    }
    catch(e){
        result.message = "failed to add user to liked list";
    }
    return result;
}



async function removeUserFromLikedArray(email,postid){
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try{
        let updateResult = await postModel.updateOne({postId:postid},{$pull:{likedUsers:email}});
        if(updateResult.modifiedCount != 0){
            result.success = true;
            result.message = "removed user from liked list";
            result.data = "";
        }
        else{
            result.message = "removing user from liked list failed";
        }
    }
    catch(e){
        result.message = "failed to remove user from liked list";
    }
    return result;
}



async function removeUserFromDislikedArray(email,postid){
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try{
        let updateResult = await postModel.updateOne({postId:postid},{$pull:{dislikedUsers:email}});
        if(updateResult.modifiedCount != 0){
            result.success = true;
            result.message = "removed user from dislikedUsers list";
            result.data = "";
        }
        else{
            result.message = "removing user from dislikedUsers list failed";
        }
    }
    catch(e){
        result.message = "failed to remove user from dislikedUsers list";
    }
    return result;
}



async function addUserToDislikedArray(email,postid){
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try{
        let updateResult = await postModel.updateOne({postId:postid},{$push:{dislikedUsers:email}});
        if(updateResult.modifiedCount != 0){
            result.success = true;
            result.message = "Added user to dislikedUsers list";
            result.data = "";
        }
        else{
            result.message = "Addeding user to dislikedUsers list failed";
        }
    }
    catch(e){
        result.message = "failed to add user to dislikedUsers list";
    }
    return result;
}




async function fetchPostData(postid){
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try{
        let fetchResult = await postModel.findOne({postId:postid});
            result.success = true;
            result.message = "fetched post data";
            result.data = fetchResult;
    }
    catch(e){
        result.message = "fetching post data failed";
    }
    return result;
}



async function addNewComment(commentData){
    let result = {
        success: false,
        message: "",
        data: ""
    }
    // console.log("commentData",commentData)
    try{
        let newComment = {
            userPic : commentData.userPic,
            userName : commentData.userName,
            commentText : commentData.commentText,
            commentedTime : new Date()
        }
        // console.log("newComment",newComment)
        let updateResult = await postModel.updateOne({postId:commentData.postId},{$push:{comments:newComment}});
        if(updateResult.modifiedCount != 0){
            // console.log("updated")
            result.success = true;
            result.message = "Added comment to comments list";
            result.data = "";
        }
        else{
            result.message = "Adding comment to comments list failed";
        }
    }
    catch(e){
        result.message = "failed to Add comment to comments list";
    }
    return result;
}
module.exports = {fetchMyPosts, addUserToDislikedArray, addUserToLikedArray, removeUserFromDislikedArray, removeUserFromLikedArray, fetchPostData, addNewComment};