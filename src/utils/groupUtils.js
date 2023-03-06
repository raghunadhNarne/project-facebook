const { groupModel } = require("../models/groupModel");


async function isGroupExists(groupDetails) {
    let data = await groupModel.findOne({ groupName: groupDetails.groupName });
    return data != undefined;
}

async function makeGroup(groupDetails) {
    let result = {
        success: false,
        message: "",
        data: ""
    }
    let isGroupAlreadyExists = await isGroupExists(groupDetails);
    if (!isGroupAlreadyExists) {
        let newGroup = new groupModel({
            groupName: groupDetails.groupName,
            groupPic: groupDetails.groupPic,
            groupOwnerName: groupDetails.groupOwnerName,
            groupOwnerEmail: groupDetails.groupOwnerEmail,
            groupOwnerPic: groupDetails.groupOwnerPic,
            senderName: groupDetails.senderName,
            senderEmail: groupDetails.senderEmail,
            senderPic: groupDetails.senderPic,
            status: groupDetails.status
        })
        try {
            let data = await newGroup.save();
            result.success = true;
            result.message = "Successfully created group";
        }
        catch (e) {
            result.message = "Unable to create group";
        }
    }
    else {
        result.message = "Group with same name already exists"
    }
    return result;
}



async function fetchMyGroups(requiredDetails) {
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try {
        let data = await groupModel.find({ senderEmail: requiredDetails.email, status: requiredDetails.status });
        if (data.length != 0) {
            result.success = true;
            result.message = "Successfully fetched my details";
            result.data = data;
        }
        else {
            result.message = "Not yet joined in any group";
        }
    }
    catch (e) {
        result.message = "Unable fetch your groups";
    }
    return result;
}


async function leaveFromGroup(requiredDetails) {
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try {
        let data = await groupModel.deleteOne({ senderEmail: requiredDetails.email, groupName: requiredDetails.groupName });
        result.success = true,
            result.message = "Successfully exited from group";

    }
    catch (e) {
        result.message = "Unable to exit from group";
    }
    return result;
}

async function getGlobalGroups(groupDetails) {
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try {
        let data = await groupModel.aggregate([
            {
                $match: {
                    senderEmail:{$ne:groupDetails.email}
                }
            },
            {
                $group:{
                    _id:"$groupName",
                    all: {
                      $push: "$$ROOT"
                    }
                }
            }

        ])
        if (data.length != 0) {
            result.message = true;
            result.data = data;
        }
        else {
            result.message = "No global groups found";
        }
    }
    catch (e) {
        result.message = "Unable to fetch the global groups";
    }
    return result;
}


async function joinGrpRequest(requiredDetails){
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try{
        let newGroupRequest = new groupModel({
            groupName: requiredDetails.groupName,
            groupPic: requiredDetails.groupPic,
            groupOwnerName: requiredDetails.groupOwnerName,
            groupOwnerEmail: requiredDetails.groupOwnerEmail,
            groupOwnerPic: requiredDetails.groupOwnerPic,
            senderName: requiredDetails.senderName,
            senderEmail: requiredDetails.senderEmail,
            senderPic: requiredDetails.senderPic,
            status: requiredDetails.status
        })
        let data = await newGroupRequest.save();
        result.success=true;
        result.message="Successfully sent a group request";

    }
    catch(e){
        result.message="Unable to send the rewuest";
    }
    return result;
}


async function getGroupsOfMe(requiredDetails){
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try{
        let data = await groupModel.find({groupOwnerEmail:requiredDetails.email,senderEmail:requiredDetails.email});
        result.success = true;
        result.message = "successfully fetched your groups";
        result.data = data;
    }
    catch(e){
        result.message = "Unable to fetch the groups";
    }
    return result;
}


async function getSpecificGroupRequests(requiredDetails){
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try{
        let data = await groupModel.find({status:requiredDetails.status,groupOwnerEmail:requiredDetails.email,groupName:requiredDetails.groupName});
        result.success = true;
        result.message = "Successfully fetched the group requests";
        result.data = data;
    }
    catch(e){
        result.message = "Unabled to fetch the group requests";
    }
    return result;
}


async function takeActionOnGroupRequest(requiredDetails){
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try{
        if(requiredDetails.status == "accept"){
            let data = await groupModel.updateOne({groupOwnerEmail:requiredDetails.email,senderEmail:requiredDetails.senderEmail,groupName:requiredDetails.groupName},{$set:{status:requiredDetails.status}});
        }
        else{
            let data = await groupModel.deleteOne({groupOwnerEmail:requiredDetails.email,senderEmail:requiredDetails.senderEmail,groupName:requiredDetails.groupName});
        }
        result.success = true;
        result.message = `Successfully ${requiredDetails.status}ed  request`
    }
    catch(e){
        result.message = "Unable to take on the request";
    }
    return result;
}

module.exports = { makeGroup, fetchMyGroups, leaveFromGroup, getGlobalGroups, joinGrpRequest,getGroupsOfMe,getSpecificGroupRequests,takeActionOnGroupRequest}