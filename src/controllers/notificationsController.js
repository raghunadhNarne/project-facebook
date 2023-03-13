const { fetchAllNotifications, addNewNotificationForUser, deleteNotificationWithArrayIndex } = require("../utils/notificationsUtils");
async function getMyNotifications(req,res){
    let data = req.body;
    let result = await fetchAllNotifications(data.email);

    res.send(result);
}


async function addNewNotification(req,res){
    let data = req.body;
    let result = await addNewNotificationForUser(data);

    res.send(result);
}


async function deleteNotification(req,res){
    let data = req.body;
    let result = await deleteNotificationWithArrayIndex(data);

    res.send(result);
}
deleteNotification

module.exports = {getMyNotifications, addNewNotification, deleteNotification}