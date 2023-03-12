const { notificationsModel } = require("../models/notificationsModel");

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
        console.log("notifications util",notifications)
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
        data: ""
    }
    try{
        let data = await notificationsModel.findOne({email:myEmail});
        result.success = true;
        result.message = "successfully fetched notifications";
        result.data = data;
        // console.log("notifications util",data)
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
        // console.log("newNotification",newNotification)
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

module.exports = {getNotificationsByEmailWithinLast24Hours, fetchAllNotifications, addNewNotificationForUser, deleteNotificationWithArrayIndex, createNewNotificationforUser}