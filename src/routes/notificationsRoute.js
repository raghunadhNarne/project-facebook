const notificationsRouter = require('express').Router();
const { getMyNotifications, addNewNotification, deleteNotification,notifyAllFriends } = require('../controllers/notificationsController');

notificationsRouter.post('/getMyNotifications',getMyNotifications);
notificationsRouter.post('/addNewNotification', addNewNotification);
notificationsRouter.post('/deleteNotification', deleteNotification);
notificationsRouter.post('/notifyAllFriends',notifyAllFriends)

module.exports = notificationsRouter;