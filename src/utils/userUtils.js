const { userModel } = require("../models/userModel");

async function isUserExist(myEmail){
    let userData = await userModel.findOne({email:myEmail});
    // console.log(userData);
    if(userData == undefined) 
        return false;
    else 
        return true;
}

module.exports = {isUserExist};