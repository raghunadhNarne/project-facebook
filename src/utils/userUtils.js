const { userModel } = require("../models/userModel");
const { userExist } = require('../utils/signupUtils');
const { createRecentActivityforUser } = require("./recentActivityUtils");
const twilio = require('twilio');
var randomstring = require("randomstring");
const bcrypt = require('bcrypt');
const { createNewNotificationforUser } = require("./notificationsUtils");

async function isUserExist(myEmail){
    let userData = await userModel.findOne({email:myEmail});
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
        
        var tw = new twilio(process.env.TWILIO_SID,process.env.TWILIO_TOKEN);
        var val=randomstring.generate(5)
        let salt = await bcrypt.genSalt();
        let hashedpassword = await bcrypt.hash(val,salt);
        tw.messages.create({
            body: 'Hello '+obj.email+"! your request is accepted as "+obj.type+". Your current one time password is "+val+".You can change your password after log in.",
            to: '+918498069774',
            from: "+15675220781" 
        })
        .then(async (message) => {
            let data=await userModel.updateOne({email:obj.email},{$set:{password:hashedpassword,status:"accept",role:obj.type}})

            await createRecentActivityforUser(obj.email)
            await createNewNotificationforUser(obj.email);
            
            result.success=true;
            result.data=data

            result.message="succesfully accepted the pending user request and sent the otp to mobileNo"
        })
        .catch(err=>{
            result.success=false;
            result.message="failed to send otp to mobileNo"
        })
        
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

        var tw = new twilio(process.env.TWILIO_SID,process.env.TWILIO_TOKEN);
        var val=randomstring.generate(5)
        let salt = await bcrypt.genSalt();
        let hashedpassword = await bcrypt.hash(val,salt);
        tw.messages.create({
            body: `Your parent created Winku account for you!!.You credentials are Email:${userDetails.body.email},Password:${val}`,
            to: '+918498069774',
            from: "+15675220781" 
        })
        .then(async (message) => {

            await createRecentActivityforUser(userDetails.body.email)
            await createNewNotificationforUser(userDetails.body.email);
            
            let newuser = new userModel({
                firstName : userDetails.body.firstName,
                lastName : userDetails.body.lastName,
                dob : userDetails.body.dob,
                age : userDetails.body.age,
                gender : userDetails.body.gender,
                email : userDetails.body.email,
                mobileNo : null,
                password : hashedpassword,
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
        })
        .catch(err=>{
            result.success=false;
            result.message="failed to send otp to mobileNo"
        })

        
        
    }
    else{
        result.message = "user child already exist";
    }
    
    return result;
}

async function updateUser(obj)
{
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
                aboutMe:obj.body.aboutMe,
                twitterLink:obj.body.twitter,
                googleLink:obj.body.google,
                facebookLink:obj.body.facebook
            }})

        if(obj.files.profile!=undefined)
        {
            let data=await userModel.updateOne({email:obj.body.email},{$set:{profilePic:obj.files.profile[0].location}})
        }
        if(obj.files.cover!=undefined)
        {
            let data=await userModel.updateOne({email:obj.body.email},{$set:{coverPic:obj.files.cover[0].location}})
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
        let salt = await bcrypt.genSalt();
        let hashedpassword = await bcrypt.hash(obj.new,salt);

        let data = await userModel.updateOne({email:obj.email},{$set:{password:hashedpassword}})
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

async function forgotPassword(obj)
{
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try{ 

        var tw = new twilio(process.env.TWILIO_SID,process.env.TWILIO_TOKEN);
        var val=randomstring.generate(5)

        let salt = await bcrypt.genSalt();
        let hashedpassword = await bcrypt.hash(val,salt);

        
        tw.messages.create({
            body: 'Hi '+obj.email+"! this is your new password "+val+". You can change your password after logged in",
            to: '+918498069774',
            from: "+15675220781" 
        })
        .then(async (message) => {
            let update=await userModel.updateOne({email:obj.email},{$set:{password:hashedpassword}})


            result.success=true;
            result.message="succesfully sent the otp to mobileNo"
        })
        .catch(err=>{
            result.success=false;
            result.message="failed to send otp to mobileNo"
        })
    }
    catch(e){
        result.message = "Failed to send the otp";
    }
    return result;
}

async function getRole(email){
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try{
        let data = await userModel.findOne({email:email});
        result.success = true;
        result.data = data.role;
    }
    catch(e){
        result.message = "failed to get role"
    }
    return result;
}

module.exports = {isUserExist,fetchUserData,allPendingUsers,deletePendingRequest,acceptPendingRequest,addChild,updateUser,getSingleUser,changePassword,forgotPassword, getRole };

