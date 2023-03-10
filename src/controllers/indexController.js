const { fetchMyPosts, addUserToLikedArray, addUserToDislikedArray, removeUserFromDislikedArray, removeUserFromLikedArray, fetchPostData, addNewComment, fetchMyFeedPosts ,childrenPendingPosts ,acceptPendingChildPost ,deletePendingChildPost,totalLikesAndPosts} = require("../utils/indexUtils");
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


async function addComment(req,res){
    let data = req.body;
    // console.log("data in controller",data);

    let result = await addNewComment(data);
    res.send(result);
}


async function getMyFeedPosts(req, res) {
    let data = req.body;

    let result = await fetchMyFeedPosts(data.email);
    res.send(result);
}

async function myChildrenPendingPosts(req,res)
{
    let data=req.body;
    let result = await childrenPendingPosts(data);
    res.send(result)
}

async function justAcceptPendingChildPost(req,res)
{
    let data=req.body;
    let result = await acceptPendingChildPost(data);
    res.send(result)
}

async function justDeletePendingChildPost(req,res)
{
    let data=req.body;
    let result = await deletePendingChildPost(data);
    res.send(result)
}

async function getTotalLikesAndPosts(req,res)
{
    let data=req.body
    let result = await totalLikesAndPosts(data)
    res.send(result)
}


module.exports = {getMyPosts, getLikedUserdata, addLike, addDislike, removeLike, removeDislike, getPostData, addComment, getMyFeedPosts ,myChildrenPendingPosts,justAcceptPendingChildPost,justDeletePendingChildPost,getTotalLikesAndPosts};