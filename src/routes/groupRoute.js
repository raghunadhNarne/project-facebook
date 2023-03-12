const groupRoute = require('express').Router();
const { creategroup, getMyGroups , leaveGroup,getNotMyGroups, joinRequest,getGroupsCreatedByMe,groupRequests,acceptOrRejectRequest,getGroupPosts,getGroupInfo} = require('../controllers/groupController');
const { upload } = require('../multer/multerConfig');



groupRoute.post("/createGroup",upload.single('groupPic'),creategroup);
groupRoute.post("/getMyGroups",getMyGroups);
groupRoute.post("/leaveGroup",leaveGroup);
groupRoute.post("/getNotMyGroups",getNotMyGroups);
groupRoute.post("/joinRequest",joinRequest);
groupRoute.post("/getGroupsCreatedByMe",getGroupsCreatedByMe);
groupRoute.post("/groupRequests",groupRequests);
groupRoute.post("/acceptOrRejectRequest",acceptOrRejectRequest);
groupRoute.post("/getGroupPosts",getGroupPosts)
groupRoute.post("/getGroupInfo",getGroupInfo)


module.exports =  groupRoute;