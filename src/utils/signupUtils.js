const { userModel } = require("../models/userModel");

async function userExist(email){
    try{
        let data = await userModel.findOne({email:email});
        return data != undefined;
    }
    catch(e){
        return false;
    }
}


async function createUser(userDetails){

    let result = {
        success : false,
        message : "",
        data : ""
    }

    let isUserExist = await userExist(userDetails.email);

    if(isUserExist == false){
        let newuser = new userModel({
            firstName : userDetails.body.firstName,
            lastName : userDetails.body.lastName,
            dob : null,
            age : null,
            gender : userDetails.body.gender,
            email : userDetails.body.email,
            mobileNo : userDetails.body.mobileNo,
            password : userDetails.body.password,
            city : null,
            country : null,
            aboutMe : null,
            role : null,
            status : null,
            profilePic : null,
            coverPic : null,
            facebookLink : null,
            twitterLink : null,
            googleLink : null,
            notifications : [],
            friendList : [],
            recentActivity : [],
            status:"pending",
            authfile:userDetails.file.path,
            requested:userDetails.body.type,
            parent:null
        });

    
        try{
            let data = await newuser.save();

            result.success = true;
            result.message = "successfully created user"; 
        } 
        catch(e){
            result.message = "failed to save user";
        }
        
    }
    else{
        result.message = "user already exist";
    }
    
    return result;
}

module.exports = {userExist, createUser};