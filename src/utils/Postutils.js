const { postModel } = require("../models/postModel");
const { getTotalPostsCount, updateTotalPostsCount } = require("./postsCount");
const { isUserExist } = require("./userUtils");



async function addNewFilePost(myUserEmail,postData,multerFileName){
    let result = {
        success : false,
        message : "failed to add post",
        data : ""
    }
    if(myUserEmail == "" || myUserEmail == undefined){
        result.message = " unable to get user email";
    }
    else if(postData == undefined){
        result.message = "unable to get post data";
    }
    
    else if(await isUserExist(myUserEmail) == false){
        console.log("no user");
        result.success = false;
        result.message = `no user with ${myUserEmail} email`;
        result.data = "";
    }
    else{
        let postCount = await getTotalPostsCount();
        // console.log(postData.text);
        let newPostdata = {
            postId : postCount + 1,
            userEmail : myUserEmail,
            userName : postData.userName,
            userPic : postData.userPic,
            postedTime : new Date(),
            postText : postData.text,
            postImage : null,
            postVideo : null,
            postType : postData.postType,
            comments : [],
            likedUsers : [],
            dislikedUsers : []
        }
        if(postData.postType == "image"){
            newPostdata.postImage = multerFileName;
        }
        else if(postData.postType == "video"){
            newPostdata.postVideo = multerFileName;
        }


        let newPost = new postModel(newPostdata);
        try{
            let isPosted = await newPost.save();
            result.success = true;
            result.message = "successfully posted";

            await updateTotalPostsCount();
        }
        catch(e){
            result.message = "failed to add post: " + e;
        }

    }
    return result;

}

async function addNewTextPost(myUserEmail,postData){
    let result = {
        success : false,
        message : "failed to add post",
        data : ""
    }

    if(myUserEmail == "" || myUserEmail == undefined){
        result.message = " unable to get user email";
    }
    else if(postData == "" || postData == undefined){
        result.message = "unable to get post data";
    }
    
    else if(await isUserExist(myUserEmail) == false){
        result.success = false;
        result.message = `no user with ${myUserEmail} email`;
        result.data = "";
    }
    else{
        let postCount = await getTotalPostsCount();
        let newPost = new postModel({
            postId : postCount + 1,
            userEmail : myUserEmail,
            userName : postData.userName,
            userPic : postData.userPic,
            postedTime : new Date(),
            postText : postData.text,
            postImage : null,
            postVideo : null,
            postType : postData.postType,
            comments : [],
            likedUsers : [],
            dislikedUsers : []
        })
        try{
            let isPosted = await newPost.save();
            result.success = true;
            result.message = "successfully posted";
        }
        catch(e){
            result.message = "failed to add post"
        }

    }
    return result;

}

module.exports = {addNewFilePost, addNewTextPost};