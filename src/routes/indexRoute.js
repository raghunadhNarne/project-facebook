const { getMyPosts, getLikedUserdata, addLike, addDislike, removeLike, removeDislike, getPostData } = require('../controllers/indexController');

const indexRouter = require('express').Router();

indexRouter.post('/getMyPosts',getMyPosts);
indexRouter.post('/getLikedUserdata',getLikedUserdata);

indexRouter.post('/getPostData',getPostData)
indexRouter.post('/addLike',addLike)
indexRouter.post('/removeLike',removeLike)
indexRouter.post('/removeDislike',removeDislike)
indexRouter.post('/addDislike',addDislike)

module.exports = indexRouter;