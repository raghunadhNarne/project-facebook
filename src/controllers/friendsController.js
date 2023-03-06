const { addNewFriend,pendingFriendRequests,acceptPendingFriendRequests,rejectPendingFriendRequests,acceptedFriendRequests,removeFriend,myFriendRequests,revokeFriendRequest,followers,unfollowFriend } = require('../utils/friendsUtils')


async function addFriend(req,res)
{
    let result=await addNewFriend(req.body)
    res.send(result)
}

async function getPendingFriendRequests(req,res)
{
    let result=await pendingFriendRequests(req.body)
    res.send(result)
}

async function justAcceptPendingFriendRequests(req,res)
{
    let result=await acceptPendingFriendRequests(req.body)
    res.send(result);
}

async function justRejectPendingFriendRequests(req,res)
{
    let result=await rejectPendingFriendRequests(req.body)
    res.send(result);
}

async function getAcceptedFriendRequests(req,res)
{
    let result=await acceptedFriendRequests(req.body)
    res.send(result)
}

async function justRemoveFriend(req,res)
{
    let result=await removeFriend(req.body)
    res.send(result)
}


async function getMyFriendRequests(req,res)
{
    let result=await myFriendRequests(req.body)
    res.send(result)
}

async function justRevokeFriendRequest(req,res)
{
    let result = await revokeFriendRequest(req.body);
    res.send(result)
}

async function getFollowers(req,res)
{
    let result = await followers(req.body)
    res.send(result)
}

async function justUnfollowFriend(req,res)
{
    let result=await unfollowFriend(req.body)
    res.send(result)
}
module.exports={addFriend,getPendingFriendRequests,justAcceptPendingFriendRequests,justRejectPendingFriendRequests,getAcceptedFriendRequests,justRemoveFriend,getMyFriendRequests,justRevokeFriendRequest,getFollowers,justUnfollowFriend}