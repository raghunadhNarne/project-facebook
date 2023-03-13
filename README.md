# SamaritianBook

- A social media which targets young age kids
- Objective is to inculcate the values
- Before posting it requires approval of parents or admin
- Choose category of what values/learning one wants to inculcate


### Authors

- [Pranay Ramagiri](https://www.github.com/pranaydbox)
- [Raghunadh Narne](https://www.github.com/raghunadhNarne)
- [Rohith Kumar Sangati](https://www.github.com/RohithSangati)


## Features

#### Core Features
- Parent can create his account by requesting to admin.
- Once the admin accepts the request, the parent will be granted access to the account which will be intimated by using SMS.
- Parent can create the account for his children.
- Once the account has been created by the parent, child will receive acknowledgement through SMS where he can activate his account by using OTP.
- Children and parent can start posting in the app where children requires parent acceptance for posting where as parent can post independently.

#### Post Features

- One can post their posts by making their own content or can generate content using Openai API.
- Along with the text they can upload image or video for post.
- Before posting, the post data is sanitized with help of DOM Purify inorder to handle XSS scripting attack.
- This post can be seen by his friends and followers
- They can like, dislike or comment on the post.
- Every action made by the user will be reflected in the recent activity widget of the current user and a notification will be sent to his friends and followers to let them know about the post.

#### Friends Features

- A user can make friend request by searching in the friends tab.
- If other user accepts the request both will made as friends other wise the user who requests will be made as follower of other user.
- Users can see their requests made by others in Friend requests tab.
- Users can see their requests in My requests tab.
- Users can see whom they are following in My Following tab.

#### Groups Features

- Users can access their groups from My Groups tab.
- Users can search groups from Search groups tab and make requests to join the group.
- Users can create their own group from create group tab.
- One can find their group requests from group requests tab.
- After joining in the group one can post their posts in the particular group.
- One can chat with the group members by using groupchat features.

#### Chat Features

- One can make one-to-one chatting with their friends.
- One can make group chatting with the group members.


#### Notification Features

- One can receive notification for every action done on his posts by his friends and followers including likes,share and comments.
- One can receive notification for voice calls,vedio calls and live chats.

#### Profile Features

- User can edit profile picture.
- User can edit cover picture and basic information.
- User can change password.
- The user profile data is autofilled and they can edit if required

### Special Features

#### - Live video chat
#### - Video calls
#### - Voice calls
#### - Voice assistant

### Live video chat 
- One can start the live video.
- Once started it will be notified to his friends, so that they can join
- One can chat in live video streaming through live video chat

### Video calls
- One can video call to his friend.
- Once started it will be notified to his friend , so that they can join.

### Audio calls
- One can audio call to his friend through chat tab
- Once started it will be notified to his friend

### Voice assistant
- Users can be redirected to specific tabs based on what they have talked


### Techstack and Libraries used

- JWT for authentication
- Openai api for automatic content generation
- WebkitSpeech recognition for voice assistant
- Socket.io for chattings
- Peerjs and socket.io for audio,video and live video chats.
- Multer-s3 for uploading images
- dompurify for preventing xss scripting attack.
- Send OTP using Twilio authentication
- Sweet Alert for custom popup 
   
    

# API Documentation

## IndexRoute

* indexRouter.post('/getMyPosts',getMyPosts);
* indexRouter.post('/getLikedUserdata',getLikedUserdata);
* indexRouter.post('/getPostData',getPostData)
* indexRouter.post('/addLike',addLike)
* indexRouter.post('/removeLike',removeLike)
* indexRouter.post('/removeDislike',removeDislike)
* indexRouter.post('/addDislike',addDislike)
* indexRouter.post('/addNewComment',addComment)
* indexRouter.post('/getmychildrenpendingposts',myChildrenPendingPosts)
* indexRouter.post('/acceptpendingchildpost',justAcceptPendingChildPost)
* indexRouter.post('/deletependingchildpost',justDeletePendingChildPost)
* indexRouter.post('/totallikesandposts',getTotalLikesAndPosts)

## FriendsRoute

* friendsRouter.post('/addfriend',friendsController.addFriend)
* friendsRouter.post('/getpendingfriendrequests',friendsController.getPendingFriendRequests)
* friendsRouter.post('/acceptpendingfriendrequest',friendsController.justAcceptPendingFriendRequests);
* friendsRouter.post('/rejectpendingfriendrequest',friendsController.justRejectPendingFriendRequests);
* friendsRouter.post('/getfriends',friendsController.getAcceptedFriendRequests)
* friendsRouter.post('/removefriend',friendsController.justRemoveFriend)
* friendsRouter.post('/getmyfriendrequests',friendsController.getMyFriendRequests)
* friendsRouter.post('/revokefriendrequest',friendsController.justRevokeFriendRequest)
* friendsRouter.post('/getmyfollowers',friendsController.getFollowers)
* friendsRouter.post('/getmyfollowing',friendsController.getMyFollowing)
* friendsRouter.post('/unfollowfriend',friendsController.justUnfollowFriend)
* friendsRouter.post('/searchfriends',friendsController.justSearchFriends)
* friendsRouter.post('/totalfriendandfollowers',friendsController.getTotalFriendsAndFollowers)

## GroupRoute
* groupRoute.post("/createGroup",upload.single('groupPic'),creategroup);
* groupRoute.post("/getMyGroups",getMyGroups);
* groupRoute.post("/leaveGroup",leaveGroup);
* groupRoute.post("/getNotMyGroups",getNotMyGroups);
* groupRoute.post("/joinRequest",joinRequest);
* groupRoute.post("/getGroupsCreatedByMe",getGroupsCreatedByMe);
* groupRoute.post("/groupRequests",groupRequests);
* groupRoute.post("/acceptOrRejectRequest",acceptOrRejectRequest);
* groupRoute.post("/getGroupPosts",getGroupPosts)
* groupRoute.post("/getGroupInfo",getGroupInfo)

## GroupChatRoute
* groupChatRoute.post("/fetchchating", fetchchating);
* groupChatRoute.post("/putmessage", putmessage);

## ChatRoute
* chatRoute.post("/fetchchating",fetchchating);
* chatRoute.post("/putmessage",putmessage);


## NotificationsRoute

* notificationsRouter.post('/getMyNotifications',getMyNotifications);
* notificationsRouter.post('/addNewNotification', addNewNotification);
* notificationsRouter.post('/deleteNotification', deleteNotification)

## UserRoute 
* userRouter.get('/getallpendingusers',userController.getAllPendingUsers)
* userRouter.post('/deletependingrequest',userController.justDeletePendingRequest)
* userRouter.post('/acceptpendingrequest',userController.justAcceptPendingRequest)
* userRouter.post('/addchild',userController.justAddChild)
* userRouter.post('/updateuser',upload.fields([{name:"profile",maxCount:1},{name:"cover",maxCount:1}]),userController.justUpdateUser)
* userRouter.post('/getsingleuser',userController.justGetSingleUser)
* userRouter.post('/changepassword',userController.justChangePassword)
* userRouter.post('/forgotpassword',userController.justForgotPassword)

## xssScriptingFixRoute
* xssScriptingFixRouter.post('/sanitizeDOM',sanitizeDOM);

## RecentActivityRoute

* recentActivityRouter.post('/getMyRecentActivity',getMyRecentActivity);
* recentActivityRouter.post('/addNewActivity', addNewActivity);
* recentActivityRouter.post('/getMyLatestFourActivities',getMyLatestFourActivities)

## PostRoute
* postRouter.post('/textPost',createNewTextPost);
* postRouter.post('/filePost',upload.single("image"),createNewFilePost);
* postRouter.post('/autoGenerateContent',autoGenerateContent)

## MediaRoute
* mediaRouter.post('/getMyPhotos',getMyPhotos);
* mediaRouter.post('/getMyVideos', getMyVideos);

## adRoute

* adRoute.post('/addnewad',upload.single("image"),justAddNewAdd)
* adRoute.get('/getallads',justGetAllAds)

