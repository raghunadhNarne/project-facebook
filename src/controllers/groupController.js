const { makeGroup, fetchMyGroups,leaveFromGroup,getGlobalGroups,joinGrpRequest,getGroupsOfMe,getSpecificGroupRequests,takeActionOnGroupRequest ,getSpecificGroupPosts} = require('../utils/groupUtils');

async function creategroup(req, res) {
    let groupDetails = req.body;
    let groupPic = req.file.path;
    let result = await makeGroup(groupDetails,groupPic);
    res.send(result);
}


async function getMyGroups(req, res) {
    let requiredDetails = req.body;

    let result = await fetchMyGroups(requiredDetails);
    res.send(result);
}



async function leaveGroup(req,res){
    let requiredDetails = req.body;

    let result = await leaveFromGroup(requiredDetails);
    res.send(result);
}


async function getNotMyGroups(req,res){
    let requiredDetails = req.body;

    let result = await getGlobalGroups(requiredDetails);
    res.send(result);
}


async function joinRequest(req,res){
    let requiredDetails = req.body;

    let result = await joinGrpRequest(requiredDetails);
    res.send(result);
}


async function getGroupsCreatedByMe(req,res){
    let requiredDetails = req.body;

    let result = await getGroupsOfMe(requiredDetails);
    res.send(result);
}


async function groupRequests(req,res){
    let requiredDetails = req.body;

    let result = await getSpecificGroupRequests(requiredDetails);
    res.send(result);
}


async function acceptOrRejectRequest(req,res){
    let requiredDetails = req.body;

    let result = await takeActionOnGroupRequest(requiredDetails);
    res.send(result);
}


async function getGroupPosts(req,res){
    let requiredDetails = req.body;

    let result = await getSpecificGroupPosts(requiredDetails);
    res.send(result);
}

module.exports = { creategroup, getMyGroups,leaveGroup,getNotMyGroups,joinRequest,getGroupsCreatedByMe,groupRequests,acceptOrRejectRequest,getGroupPosts};