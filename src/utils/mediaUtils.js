const { postModel } = require("../models/postModel");

async function fetchAllPhotosOfUser(userEmail){
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try{
        let data = await postModel.find({userEmail:userEmail.email,status:"accepted",postType:"image"});
        result.success = true;
        result.message = "successfully fetched photos";
        result.data = data;
    }
    catch(e){
        result.message = "Unable to fetch photos";
    }
    return result;
}



async function fetchAllVideosOfUser(userEmail){
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try{
        let data = await postModel.findOne({email:userEmail},{status:"accepted"},{postType:"video"});
        result.success = true;
        result.message = "successfully fetched videos";
        result.data = data;
    }
    catch(e){
        result.message = "Unable to fetch videos";
    }
    return result;
}

module.exports = {fetchAllVideosOfUser, fetchAllPhotosOfUser}