const { fetchMyPosts, addUserToLikedArray, addUserToDislikedArray, removeUserFromDislikedArray, removeUserFromLikedArray, fetchPostData } = require("../utils/indexUtils");
const { fetchUserData } = require("../utils/userUtils");

async function getMyPosts(req, res) {
    let data = req.body;

    let result = await fetchMyPosts(data.email);
    res.send(result);
}


async function getLikedUserdata(req,res){
    let data = req.body;

    let result = await fetchUserData(data.email);
    res.send(result)
}


async function addLike(req,res){
    let data = req.body;
    
    let result = await addUserToLikedArray(data.email,data.postId);
    res.send(result)
}



async function addDislike(req,res){
    let data = req.body;

    let result = await addUserToDislikedArray(data.email,data.postId);
    res.send(result)
}



async function removeLike(req,res){
    let data = req.body;

    let result = await removeUserFromLikedArray(data.email,data.postId);
    res.send(result)
}



async function removeDislike(req,res){
    let data = req.body;

    let result = await removeUserFromDislikedArray(data.email,data.postId);
    res.send(result)
}


async function getPostData(req, res) {
    let data = req.body;

    let result = await fetchPostData(data.postId);
    res.send(result);
}


module.exports = {getMyPosts, getLikedUserdata, addLike, addDislike, removeLike, removeDislike, getPostData};