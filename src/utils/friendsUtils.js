const { chatModel } = require('../models/chatModel')
const { friendsModel } = require('../models/friendsModel')
const { userModel } = require('../models/userModel')


async function addNewFriend(obj) {
    let result = {
        success: false,
        message: "",
        data: ""
    }
    let friendRequest = new friendsModel({
        senderEmail: obj.senderEmail,
        senderPic: obj.senderPic,
        senderName: obj.senderName,
        receiverEmail: obj.receiverEmail,
        receiverPic: obj.receiverPic,
        receiverName: obj.receiverName,
        status: obj.status
    })
    try {
        let data = await friendRequest.save();
        result.success = true;
        result.message = "Successfully created friend request"
    }
    catch (e) {
        result.message("failed to create friend request")
    }
    return result;
}


async function pendingFriendRequests(obj) {
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try {
        let data = await friendsModel.find({ receiverEmail: obj.email, status: "pending" })
        result.success = true;
        result.message = "successfully got the pending friends request data";
        result.data = data;
    }
    catch (e) {
        result.message = "error to get the friends request data"
    }
    return result;
}

async function acceptPendingFriendRequests(obj) {
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try {
        let data = await friendsModel.updateOne({ senderEmail: obj.senderEmail, receiverEmail: obj.receiverEmail }, { $set: { status: "accept" } });
        let chatRoom = obj.senderEmail + ":" + obj.receiverEmail;
        if (obj.receiverEmail < obj.senderEmail) {
            chatRoom = obj.receiverEmail + ":" + obj.senderEmail;
        }
        await createRoomForFriendsChat(chatRoom);
        result.success = true;
        result.message = "successfully accepted the pending friend request";
    }
    catch (e) {
        result.message = "error to accept the friend request"
    }
    return result;
}


async function createRoomForFriendsChat(chatRoom) {
    let obj = {
        chatRoom : chatRoom
    }
    let usersChat = new chatModel(obj);
    let data = await usersChat.save();
    // console.log(data);
}

async function rejectPendingFriendRequests(obj) {
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try {
        let data = await friendsModel.updateOne({ senderEmail: obj.senderEmail, receiverEmail: obj.receiverEmail }, { $set: { status: "reject" } })
        result.success = true;
        result.message = "successfully rejected the pending friend request";
    }
    catch (e) {
        result.message = "error to reject the friend request"
    }
    return result;
}

async function acceptedFriendRequests(obj) {
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try {
        let data = await friendsModel.find({
            $or: [
                { senderEmail: obj.email, status: "accept" },
                { receiverEmail: obj.email, status: "accept" }
            ]
        })

        result.success = true;
        result.message = "successfully got the accepted friends";
        result.data = data
    }
    catch (e) {
        result.message = "error to get accepted friends"
    }
    return result;
}

async function removeFriend(obj) {
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try {
        let data = await friendsModel.updateOne(
            {
                $or:
                    [
                        { senderEmail: obj.senderEmail, receiverEmail: obj.receiverEmail },
                        { senderEmail: obj.receiverEmail, receiverEmail: obj.senderEmail }
                    ]
            },
            { $set: { status: "reject" } }
        )
        // if(data.matchedCount==0)
        // { 
        //     let data = await friendsModel.updateOne({senderEmail:obj.receiverEmail,receiverEmail:obj.senderEmail},{$set:{status:"reject"}})
        // }
        result.success = true;
        result.message = "successfully removed the friend";
    }
    catch (e) {
        result.message = "error to remove friend"
    }
    return result;
}


async function myFriendRequests(obj) {
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try {
        let data = await friendsModel.find({ senderEmail: obj.email, status: "pending" })
        result.success = true;
        result.message = "successfully got the friend requests data";
        result.data = data;
    }
    catch (e) {
        result.message = "error to get the friend requests data"
    }
    return result;
}

async function revokeFriendRequest(obj) {
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try {
        let data = await friendsModel.deleteOne({ senderEmail: obj.senderEmail, receiverEmail: obj.receiverEmail })
        result.success = true;
        result.message = "successfully revoked the friend request";
    }
    catch (e) {
        result.message = "error to revoke the friend request"
    }
    return result;
}

async function followers(obj) {
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try {
        let data = await friendsModel.find({ receiverEmail: obj.email, status: "reject" })

        result.success = true;
        result.message = "successfully got the followers data";
        result.data = data
    }
    catch (e) {
        result.message = "error to get the followers data"
    }
    return result;
}


async function myFollowing(obj) {
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try {
        let data = await friendsModel.find({ senderEmail: obj.email, status: "reject" })
        result.success = true;
        result.message = "successfully got the followers data";
        result.data = data
    }
    catch (e) {
        result.message = "error to get the followers data"
    }
    return result;
}


async function unfollowFriend(obj) {
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try {
        let data = await friendsModel.deleteOne({
            $or: [
                { senderEmail: obj.senderEmail, receiverEmail: obj.receiverEmail },
                { senderEmail: obj.receiverEmail, receiverEmail: obj.senderEmail }
            ]
        })
        console.log(data)
        result.success = true;
        result.message = "successfully unfollowed the friend";
    }
    catch (e) {
        result.message = "error to unfollow friend"
    }
    return result;
}

async function searchFriends(obj) {
    // obj=JSON.parse(obj)
    // console.log(obj)
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try {
        let data = await friendsModel.find({
            $or: [
                { "receiverEmail": obj.email },
                { "senderEmail": obj.email }
            ]
        },
            {
                _id: 0,
                senderEmail: 1,
                receiverEmail: 1
            })
        let arr = []
        for (x in data) {
            if (data[x].receiverEmail == obj.email) arr.push(data[x].senderEmail)
            else arr.push(data[x].receiverEmail)
        }
        arr.push(obj.email)
        
        if(obj.firstName.length>0)
        data = await userModel.find({email:{$nin:arr},firstName:{"$regex":obj.firstName,"$options":"i"}})

        result.success=true;
        result.message="successfully searched the friend";
        if(obj.firstName.length>0)
        result.data=data;
    }
    catch (e) {
        result.message = "error to search friend"
    }
    return result;
}


async function totalFriendsAndFollowers(obj)
{
    let result = {
        success: false,
        message: "",
        data: {}
    }
    try {
        // console.log(obj.email)
        let friends = await friendsModel.find({
            $or: [
                { senderEmail: obj.email, status:"accept" },
                { receiverEmail: obj.email, status:"accept" }
            ]
        })

        let followers = await friendsModel.find(
                { receiverEmail: obj.email, status:"reject" }
            )
        result.data={friends:friends.length,followers:followers.length}
        // console.log(friends,followers)
        result.success = true;
        result.message = "successfully got the count";
    }
    catch (e) {
        result.message = "error to get count"
    }
    return result;
}

module.exports = { addNewFriend, pendingFriendRequests, acceptPendingFriendRequests, rejectPendingFriendRequests, acceptedFriendRequests, removeFriend, myFriendRequests, revokeFriendRequest, followers, myFollowing, unfollowFriend, searchFriends ,totalFriendsAndFollowers}


