const groupRoute = require('express').Router();
const { creategroup, getMyGroups , leaveGroup,getNotMyGroups, joinRequest,getGroupsCreatedByMe,groupRequests,acceptOrRejectRequest} = require('../controllers/groupController');



groupRoute.post("/createGroup", creategroup);
groupRoute.post("/getMyGroups",getMyGroups);
groupRoute.post("/leaveGroup",leaveGroup);
groupRoute.post("/getNotMyGroups",getNotMyGroups);
groupRoute.post("/joinRequest",joinRequest);
groupRoute.post("/getGroupsCreatedByMe",getGroupsCreatedByMe);
groupRoute.post("/groupRequests",groupRequests);
groupRoute.post("/acceptOrRejectRequest",acceptOrRejectRequest);


module.exports =  groupRoute;