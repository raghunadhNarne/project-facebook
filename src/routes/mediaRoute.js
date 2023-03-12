const mediaRouter = require('express').Router();
const { getMyPhotos, getMyVideos } = require('../controllers/mediaController');
mediaRouter.post('/getMyPhotos',getMyPhotos);
mediaRouter.post('/getMyVideos', getMyVideos);

module.exports = mediaRouter;