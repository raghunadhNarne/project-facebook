const { notificationsModel } = require("../models/notificationsModel");
const { acceptedFriendRequests } = require("./friendsUtils");

async function getNotificationsByEmailWithinLast24Hours(myEmail){
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try{
        let now = new Date();
        let yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        let notifications = await notificationsModel.find({
            email: myEmail,
            "notifications.timeStamp": {
                $gte: yesterday.toISOString()
            }
        })
        result.success = true;
        result.message = "successfully fetched notifications";
        result.data = notifications;
    }
    catch(e){
        result.message = "Unable to fetch notifications";
    }
    return result;
}


async function fetchAllNotifications(myEmail){
    let result = {
        success: false,
        message: "",
        data: "",
        count:0
    }
    try{
        let data = await notificationsModel.findOne({email:myEmail});
        let count = await notificationsModel.aggregate([
            {
                $match:{email:myEmail}
            },
            {
                $project:{
                    count:{$size:"$notifications"},
                    _id:0
                }
            }
        ])
        result.success = true;
        result.message = "successfully fetched notifications";
        result.data = data;
        result.count = count[0].count;
    }
    catch(e){
        result.message = "Unable to fetch notifications";
    }
    return result;
}


async function addNewNotificationForUser(notificationData){
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try{

        let newNotification = {
            timeStamp : new Date(),
            name : notificationData.name, 
            action : notificationData.action,
            url : notificationData.url
        }
        let data = await notificationsModel.updateOne({email:notificationData.email},{$push:{notifications:newNotification}});
        result.success = true;
        result.message = "successfully added notification";
        result.data = data;
    }
    catch(e){
        result.message = "Unable to add notification";
    }
    return result;
}



async function deleteNotificationWithArrayIndex({arrayIndex,email}){
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try{
        let index = `notifications.${arrayIndex}`;
        let data = await notificationsModel.updateOne({email:email},{$unset:{[index]:1}});
        data = await notificationsModel.updateOne({email:email},{$pull:{"notifications":null}});
        result.success = true;
        result.message = "successfully deleted notification";
        result.data = data;
    }
    catch(e){
        result.message = "Unable to delete notification";
    }
    return result;
}


async function createNewNotificationforUser(myEmail){
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try{
        let newUser = new notificationsModel({
            email : myEmail,
            activities : [],
        })
        await newUser.save();
        
        result.success = true;
        result.message = `successfully initiated notifications record for ${myEmail}`;
    }
    catch(e){
        result.message = `failed to initialize notifications record for ${myEmail}`;
    }
    return result;
}


async function notifyToAllFriends(requiredDetails){
    let result = {
        success: false,
        message: "",
        data: ""
    }
    let data = await acceptedFriendRequests(requiredDetails);
    let friends = []
    for(x in data.data){
        obj=data.data[x];
        if(obj.senderEmail == requiredDetails.email){
            friends.push(obj.receiverEmail)
        }
        else{
            friends.push(obj.senderEmail);
        }
    }
    try{
        let newNotification = {
            timeStamp : new Date(),
            name : requiredDetails.name, 
            action : requiredDetails.action,
            url : requiredDetails.url
        }
        data = await notificationsModel.updateMany({email:{$in:friends}},{$push:{notifications:newNotification}});
        result.success = 'true';
        result.message = 'Successfully sent notfications';
    }
    catch(e){
        result.message = "unable to send notifications to the friends"
    }
    return result;
}





module.exports = {getNotificationsByEmailWithinLast24Hours, fetchAllNotifications, addNewNotificationForUser, deleteNotificationWithArrayIndex, createNewNotificationforUser,notifyToAllFriends}