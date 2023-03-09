const { userModel } = require("../models/userModel");

async function isUserExist(myEmail){
    let userData = await userModel.findOne({email:myEmail});
    // console.log(userData);
    if(userData == undefined) 
        return false;
    else 
        return true;
}


async function fetchUserData(Myemail){
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try{
        let userData = await userModel.findOne({ email: Myemail});
        if(userData.length != 0){
            result.success = true;
            result.message = "Fetched posts";
            result.data = userData;
        }
        else{
            result.message = "No user";
        }
    }
    catch(e){
        result.message = "Failed to fetch user";
    }
    return result;
}

module.exports = {isUserExist, fetchUserData};