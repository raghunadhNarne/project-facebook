const notificationsRouter = require('express').Router();
const { getMyNotifications, addNewNotification, deleteNotification } = require('../controllers/notificationsController');

notificationsRouter.post('/getMyNotifications',getMyNotifications);
notificationsRouter.post('/addNewNotification', addNewNotification);
notificationsRouter.post('/deleteNotification', deleteNotification)

module.exports = notificationsRouter;