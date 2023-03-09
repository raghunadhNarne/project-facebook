const { recentActivityModel } = require("../models/recentActivity");



async function fetchAllRecentActivity(myEmail){
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try{
        let data = await recentActivityModel.findOne({email:myEmail});
        result.success = true;
        result.message = "successfully fetched recentActivity";
        result.data = data;
    }
    catch(e){
        result.message = "Unable to fetch recentActivity";
    }
    return result;
}


async function addNewRecentActivity(Activitydata){
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try{

        let newActivity = {
            timeStamp : new Date(),
            name : Activitydata.name, 
            action : Activitydata.action
        }
        let data = await recentActivityModel.updateOne({email:Activitydata.email},{$push:{activities:newActivity}});
        result.success = true;
        result.message = "successfully add newActivity";
        result.data = data;
    }
    catch(e){
        result.message = "Unable to add newActivity";
    }
    return result;
}

module.exports = {fetchAllRecentActivity, addNewRecentActivity};