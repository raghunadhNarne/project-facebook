const { friendsModel }=require('../models/friendsModel')


async function addNewFriend(obj)
{
    let result = {
        success : false,
        message : "",
        data : ""
    }
    let friendRequest=new friendsModel({
        senderEmail:obj.senderEmail,
        senderPic:obj.senderPic,
        senderName:obj.senderName,
        receiverEmail:obj.receiverEmail,
        receiverPic:obj.receiverPic,
        receiverName:obj.receiverName,
        status:obj.status
    })
    try{
        let data=await friendRequest.save();
        result.success=true;
        result.message="Successfully created friend request"
    }
    catch(e)
    {
        result.message("failed to create friend request")
    }
    return result;
}


async function pendingFriendRequests(obj)
{
    let result = {
        success : false,
        message : "",
        data : ""
    }
    try{
        let data=await friendsModel.find({receiverEmail:obj.receiverEmail,status:"pending"})
        result.success=true;
        result.message="successfully got the pending friends request data";
        result.data=data;
    }
    catch(e)
    {
        result.message="error to get the friends request data"
    }
    return result;
}

async function acceptPendingFriendRequests(obj)
{
    let result = {
        success : false,
        message : "",
        data : ""
    }
    try{
        let data = await friendsModel.updateOne({senderEmail:obj.senderEmail,receiverEmail:obj.receiverEmail},{$set:{status:"accept"}})
        result.success=true;
        result.message="successfully accepted the pending friend request";
    }
    catch(e)
    {
        result.message="error to accept the friend request"
    }
    return result;
}

async function rejectPendingFriendRequests(obj)
{
    let result = {
        success : false,
        message : "",
        data : ""
    }
    try{
        let data = await friendsModel.updateOne({senderEmail:obj.senderEmail,receiverEmail:obj.receiverEmail},{$set:{status:"reject"}})
        result.success=true;
        result.message="successfully rejected the pending friend request";
    }
    catch(e)
    {
        result.message="error to reject the friend request"
    }
    return result;
}

async function acceptedFriendRequests(obj)
{
    let result = {
        success : false,
        message : "",
        data : ""
    }
    try{
        let data = await friendsModel.find({receiverEmail:obj.receiverEmail,status:"accept"})
        if(data.length==0) 
        {
            data=await friendsModel.find({senderEmail:obj.receiverEmail,status:"accept"})
        }
        result.success=true;
        result.message="successfully got the accepted friends";
        result.data=data
    }
    catch(e)
    {
        result.message="error to get accepted friends"
    }
    return result;
}

async function removeFriend(obj)
{
    let result = {
        success : false,
        message : "",
        data : ""
    }
    try{
        let data = await friendsModel.updateOne({senderEmail:obj.senderEmail,receiverEmail:obj.receiverEmail},{$set:{status:"reject"}})
        if(data.matchedCount==0)
        { 
            let data = await friendsModel.updateOne({senderEmail:obj.receiverEmail,receiverEmail:obj.senderEmail},{$set:{status:"reject"}})
        }
        result.success=true;
        result.message="successfully removed the friend";
    }
    catch(e)
    {
        result.message="error to remove friend"
    }
    return result;
}


async function myFriendRequests(obj)
{
    let result = {
        success : false,
        message : "",
        data : ""
    }
    try{
        let data = await friendsModel.find({senderEmail:obj.senderEmail,status:"pending"})
        result.success=true;
        result.message="successfully got the friend requests data";
        result.data=data;
    }
    catch(e)
    {
        result.message="error to get the friend requests data"
    }
    return result;
}

async function revokeFriendRequest(obj)
{
    let result = {
        success : false,
        message : "",
        data : ""
    }
    try{
        let data = await friendsModel.deleteOne({senderEmail:obj.senderEmail,receiverEmail:obj.receiverEmail})
        result.success=true;
        result.message="successfully revoked the friend request";
    }
    catch(e)
    {
        result.message="error to revoke the friend request"
    }
    return result;
}

async function followers(obj)
{
    let result = {
        success : false,
        message : "",
        data : ""
    }
    try{
        let data = await friendsModel.find({senderEmail:obj.senderEmail,status:"reject"})
        if(data.length==0)
        {
            data = await friendsModel.find({receiverEmail:obj.senderEmail,status:"reject"})
        }
        result.success=true;
        result.message="successfully got the followers data";
        result.data=data
    }
    catch(e)
    {
        result.message="error to get the followers data"
    }
    return result;
}

async function unfollowFriend(obj)
{
    let result = {
        success : false,
        message : "",
        data : ""
    }
    try{
        let data = await friendsModel.deleteOne({senderEmail:obj.senderEmail,receiverEmail:obj.receiverEmail})
        console.log(data)
        if(data.deletedCount==0)
        {
            data = await friendsModel.deleteOne({senderEmail:obj.receiverEmail,receiverEmail:obj.senderEmail})
        }
        result.success=true;
        result.message="successfully got the followers data";
    }
    catch(e)
    {
        result.message="error to get the followers data"
    }
    return result;
}


module.exports = { addNewFriend,pendingFriendRequests,acceptPendingFriendRequests,rejectPendingFriendRequests,acceptedFriendRequests,removeFriend,myFriendRequests,revokeFriendRequest,followers,unfollowFriend }