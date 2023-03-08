const recentActivityRouter = require('express').Router();
const { getMyRecentActivity } = require('../controllers/recentActivityController');


recentActivityRouter.post('/getMyRecentActivity',getMyRecentActivity);

module.exports = recentActivityRouter;