const { fetchAllRecentActivity } = require("../utils/recentActivityUtils");


async function getMyRecentActivity(req,res){
    let data = req.body;
    let result = await fetchAllRecentActivity(data.email);

    res.send(result);
}

module.exports = {getMyRecentActivity}