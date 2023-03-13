const { getMyPosts, getLikedUserdata, addLike, addDislike, removeLike, removeDislike, getPostData, addComment, myChildrenPendingPosts ,justAcceptPendingChildPost,justDeletePendingChildPost,getTotalLikesAndPosts, getMyFeedPosts } = require('../controllers/indexController');

const indexRouter = require('express').Router();

indexRouter.post('/getMyPosts',getMyPosts);
indexRouter.post('/getMyFeedPosts',getMyFeedPosts)
indexRouter.post('/getLikedUserdata',getLikedUserdata);

indexRouter.post('/getPostData',getPostData)
indexRouter.post('/addLike',addLike)
indexRouter.post('/removeLike',removeLike)
indexRouter.post('/removeDislike',removeDislike)
indexRouter.post('/addDislike',addDislike)

indexRouter.post('/addNewComment',addComment)

//parent page
indexRouter.post('/getmychildrenpendingposts',myChildrenPendingPosts)
indexRouter.post('/acceptpendingchildpost',justAcceptPendingChildPost)
indexRouter.post('/deletependingchildpost',justDeletePendingChildPost)

//likes and posts
indexRouter.post('/totallikesandposts',getTotalLikesAndPosts)
module.exports = indexRouter;