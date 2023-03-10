const recentActivityRouter = require('express').Router();
const { getMyRecentActivity, addNewActivity, getMyLatestFourActivities } = require('../controllers/recentActivityController');


recentActivityRouter.post('/getMyRecentActivity',getMyRecentActivity);
recentActivityRouter.post('/addNewActivity', addNewActivity);
recentActivityRouter.post('/getMyLatestFourActivities',getMyLatestFourActivities)

module.exports = recentActivityRouter;