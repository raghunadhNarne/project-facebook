const { userModel } = require("../models/userModel");
let bcrypt = require('bcrypt')

async function validateCredentials({email,password}){
    let result = {
        success : false,
        message : "",
        data : ""
    } 

    try{
        let userData = await userModel.findOne({email:email,status:"accept"},{_id:0});

        if(userData ==  undefined){
            result.message = "user not exist"
        }
        else{
            let isValid = bcrypt.compare(password,userData.password);
            if(isValid){
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