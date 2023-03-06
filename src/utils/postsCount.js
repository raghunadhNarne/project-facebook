const { postCountModel } = require("../models/postsCountModel");

async function getTotalPostsCount(){
    let record = await postCountModel.findOne({});
    return record.totalPostsCount;
}


async function updateTotalPostsCount(){
    let currentCount = await getTotalPostsCount();
    try{
        let result = await postCountModel.updateOne({totalPostsCount : currentCount}, {$set : {totalPostsCount : currentCount + 1}});
        return true;
    }
    catch(e){
        console.log("error is here");
        return false;
    }
    
}

module.exports = {getTotalPostsCount, updateTotalPostsCount}