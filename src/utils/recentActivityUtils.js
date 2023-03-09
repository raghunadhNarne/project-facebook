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

module.exports = {fetchAllRecentActivity};