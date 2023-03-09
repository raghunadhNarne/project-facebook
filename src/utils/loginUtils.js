const { userModel } = require("../models/userModel");

async function validateCredentials({email,password}){
    let result = {
        success : false,
        message : "",
        data : ""
    } 

    try{
        let userData = await userModel.findOne({email:email},{_id:0});
        console.log("userData",userData)

        if(userData ==  undefined){
            result.message = "user not exist"
        }
        else{
            if(userData.password === password){
                result.success = true;
                result.message = "successfully verified"
                result.data = userData;
                // console.log("user verified");
            }
            else{
                result.message = "invalid password"
           }
        }
    }
    catch(e){
        result.message = "failed to find user"
    }

    return result;
}

module.exports = {validateCredentials};