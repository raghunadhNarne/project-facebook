const recentActivityRouter = require('express').Router();
const { getMyRecentActivity, addNewActivity } = require('../controllers/recentActivityController');


recentActivityRouter.post('/getMyRecentActivity',getMyRecentActivity);
recentActivityRouter.post('/addNewActivity', addNewActivity);

module.exports = recentActivityRouter;