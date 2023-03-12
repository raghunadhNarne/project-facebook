const { fetchAllPhotosOfUser, fetchAllVideosOfUser } = require("../utils/mediaUtils");


async function getMyPhotos(req,res){
    let data = req.body;
    let result = await fetchAllPhotosOfUser(data);

    res.send(result);
}


async function getMyVideos(req,res){
    let data = req.body;
    let result = await fetchAllVideosOfUser(data);

    res.send(result);
}

module.exports = {getMyPhotos, getMyVideos}