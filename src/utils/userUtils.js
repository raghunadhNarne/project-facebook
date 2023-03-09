const { userModel } = require("../models/userModel");
const { userExist } = require('../utils/signupUtils');
const { createRecentActivityforUser } = require("./recentActivityUtils");
async function isUserExist(myEmail){
    let userData = await userModel.findOne({email:myEmail});
    // console.log(userData);
    if(userData == undefined) 
        return false;
    else 
        return true;
}

async function allPendingUsers()
{
    let result = {
        success : false,
        message : "",
        data : ""
    }
    try{
        let data = await userModel.find({status:"pending"})
        result.success=true;
        result.message="successfull got the all pending users list"
        result.data=data
    }
    catch(e)
    {
        result.message="error to get all pending users requests"
    }
    return result;

}

async function deletePendingRequest(obj)
{
    let result = {
        success : false,
        message : "",
        data : ""
    }
    try{
        let data = await userModel.deleteOne({email:obj.email})
        result.success=true;
        result.message="successfull deleted the pending user request"
        result.data=data
    }
    catch(e)
    {
        result.message="error to delete the pending user request"
    }
    return result;

}

async function acceptPendingRequest(obj)
{
    let result = {
        success : false,
        message : "",
        data : ""
    }
    try{
        let data = await userModel.updateOne({email:obj.email},{$set:{status:"accept",role:obj.type}})
        await createRecentActivityforUser(obj.email)
        result.success=true;
        result.message="successfull accepted the pending user request"
        result.data=data
    }
    catch(e)
    {
        result.message="error to accept the pending user request"
    }
    return result;

}

async function addChild(userDetails)
{
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
            dob : userDetails.body.dob,
            age : userDetails.body.age,
            gender : userDetails.body.gender,
            email : userDetails.body.email,
            mobileNo : null,
            password : userDetails.body.password,
            city : null,
            country : null,
            aboutMe : null,
            role : 'Child',
            status : null,
            profilePic : null,
            coverPic : null,
            facebookLink : null,
            twitterLink : null,
            googleLink : null,
            notifications : [],
            friendList : [],
            recentActivity : [],
            status:"accept",
            authfile:null,
            requested:"child",
            parent:userDetails.body.parent
        });

    
        try{
            let data = await newuser.save();

            let update_childlist = await userModel.updateOne({email:userDetails.body.parent},{$set:{children:userDetails.body.email}})
            result.success = true;
            result.message = "successfully created user child and update child list of parent"; 
        } 
        catch(e){
            result.message = "failed to save user child";
        }
        
    }
    else{
        result.message = "user child already exist";
    }
    
    return result;
}

async function updateUser(obj)
{
    
    // console.log(Object.keys(obj.files).length)
    // console.log(obj.body)
    let result = {
        success : false,
        message : "",
        data : ""
    }
    try{
        let data = await userModel.updateOne({email:obj.body.email},
            {$set:{
                firstName:obj.body.firstName,
                lastName:obj.body.lastName,
                mobileNo:obj.body.mobileNo,
                dob:obj.body.dob,
                gender:obj.body.gender,
                city:obj.body.city,
                country:obj.body.country,
                aboutMe:obj.body.aboutMe
            }})

        if(obj.files.profile!=undefined)
        {
            let data=await userModel.updateOne({email:obj.body.email},{$set:{profilePic:obj.files.profile[0].path}})
        }
        if(obj.files.cover!=undefined)
        {
            let data=await userModel.updateOne({email:obj.body.email},{$set:{coverPic:obj.files.cover[0].path}})
        }
        result.success=true;
        result.message="successfull updated the user"
        result.data=data
    }
    catch(e)
    {
        result.message="error to update the user"
    }
    return result;
}

async function getSingleUser(obj)
{
    let result = {
        success : false,
        message : "",
        data : ""
    }
    try{
        let data = await userModel.findOne({email:obj.email})
        result.success=true;
        result.message="successfull got the single user"
        result.data=data
    }
    catch(e)
    {
        result.message="error to get the single user"
    }
    return result;
}

async function changePassword(obj)
{
    let result = {
        success : false,
        message : "",
        data : ""
    }
    try{
        let data = await userModel.updateOne({email:obj.email},{$set:{password:obj.new}})
        result.success=true;
        result.message="successfull updated the password"
        result.data=data
    }
    catch(e)
    {
        result.message="error to update the password"
    }
    return result;

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


module.exports = {isUserExist,fetchUserData,allPendingUsers,deletePendingRequest,acceptPendingRequest,addChild,updateUser,getSingleUser,changePassword };

