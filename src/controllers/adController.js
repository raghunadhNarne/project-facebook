const { addNewAdd,getAllAds} = require("../utils/adUtils");

async function justAddNewAdd(req,res)
{
    let result = await addNewAdd(req)
    res.send(result)
}

async function justGetAllAds(req,res)
{
    let result=await getAllAds();
    res.send(result)
}

module.exports = {justAddNewAdd,justGetAllAds}