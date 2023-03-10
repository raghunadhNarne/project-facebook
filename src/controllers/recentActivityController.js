const { fetchAllRecentActivity, addNewRecentActivity } = require("../utils/recentActivityUtils");


async function getMyRecentActivity(req,res){
    let data = req.body;
    let result = await fetchAllRecentActivity(data.email);

    res.send(result);
}


async function addNewActivity(req,res){
    // console.log("hiiiiiii",req.body)
    let data = req.body;
    let result = await addNewRecentActivity(data);

    res.send(result);
}

module.exports = {getMyRecentActivity, addNewActivity}