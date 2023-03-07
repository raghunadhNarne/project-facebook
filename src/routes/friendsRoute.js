const friendsRouter = require('express').Router()
const friendsController=require('../controllers/friendsController')

friendsRouter.post('/addfriend',friendsController.addFriend)
//friend requests tab
friendsRouter.post('/getpendingfriendrequests',friendsController.getPendingFriendRequests)
friendsRouter.post('/acceptpendingfriendrequest',friendsController.justAcceptPendingFriendRequests);
friendsRouter.post('/rejectpendingfriendrequest',friendsController.justRejectPendingFriendRequests);
//friend accepted tab
friendsRouter.post('/getfriends',friendsController.getAcceptedFriendRequests)
friendsRouter.post('/removefriend',friendsController.justRemoveFriend)
//my requests tab
friendsRouter.post('/getmyfriendrequests',friendsController.getMyFriendRequests)
friendsRouter.post('/revokefriendrequest',friendsController.justRevokeFriendRequest)
//followers tab
friendsRouter.post('/getmyfollowers',friendsController.getFollowers)
//following tab
friendsRouter.post('/getmyfollowing',friendsController.getMyFollowing)
friendsRouter.post('/unfollowfriend',friendsController.justUnfollowFriend)
//search friends
friendsRouter.post('/searchfriends',friendsController.justSearchFriends)

module.exports=friendsRouter;

// {
//     "senderEmail":"pranay@gmail.com",
//     "senderPic":"1.jpg",
//     "senderName":"Pranay",
//     "receiverEmail":"pavan@gmail.com",
//     "receiverPic":"2.jpg",
//     "receiverName":"Pavan",
//     "status":"pending"
// }