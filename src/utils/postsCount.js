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
<<<<<<< HEAD
=======
        // console.log("error is here");
>>>>>>> d3f65c96b3b1ee1e782735055f219832def6641b
        return false;
    }
    
}

module.exports = {getTotalPostsCount, updateTotalPostsCount}