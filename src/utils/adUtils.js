const {adModel}= require('../models/adModel')

async function addNewAdd(obj)
{
    let result = {
        success: false,
        message: "",
        data: ""
    }
    
    let ad = new adModel({
        company:obj.body.company,
        adImage:obj.file.location,
        link:obj.body.link
    })
    try {
        let data = await ad.save();
        result.success = true;
        result.message = "Successfully save the ad"
    }
    catch (e) {
        result.message("failed to save ad")
    }
    return result;
}

async function getAllAds()
{
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try {
        let data = await adModel.find({});
        result.success = true;
        result.message = "Successfully got all ads"
        result.data=data
    }
    catch (e) {
        result.message("failed to get all ads")
    }
    return result;
}
module.exports = {addNewAdd,getAllAds}