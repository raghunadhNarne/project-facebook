const { recentActivityModel } = require("../models/recentActivity");



async function fetchAllRecentActivity(myEmail){
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try{
        let data = await recentActivityModel.findOne({email:myEmail});
        result.success = true;
        result.message = "successfully fetched recentActivity";
        result.data = data;
    }
    catch(e){
        result.message = "Unable to fetch recentActivity";
    }
    return result;
}


async function addNewRecentActivity(Activitydata){
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try{

        let newActivity = {
            timeStamp : new Date(),
            name : Activitydata.name, 
            action : Activitydata.action
        }
        let data = await recentActivityModel.updateOne({email:Activitydata.email},{$push:{activities:newActivity}});
        result.success = true;
        result.message = "successfully add newActivity";
        result.data = data;
    }
    catch(e){
        result.message = "Unable to add newActivity";
    }
    return result;
}


async function createRecentActivityforUser(myEmail){
    let result = {
        success: false,
        message: "",
        data: ""
    }
    try{
        let newUser = new recentActivityModel({
            email : myEmail,
            activities : [],
        })
        await newUser.save();
        
        result.success = true;
        result.message = `successfully initiated recentactivity record for ${myEmail}`;
    }
    catch(e){
        result.message = `failed to initialize recentactivity record for ${myEmail}`;
    }
    return result;
}


async function fetchLatestFourActivities(myEmail){
    let result = {
        success : false,
        message : "",
        data : "" 
    }
    try{
        let queryResult = await recentActivityModel.aggregate([
          {$match : {email: myEmail}},
          {
            $project : {
              activities : {
                $cond : {
                  if : {$gte: [{$size: "$activities"}, 4]},
                  then : {$slice: ["$activities", -4]},
                  else : "$activities",
                },
              },
            },
          },
        ]);
      
        if(queryResult.length > 0){
            result.success = true
            result.message = "successfully fetched activity data"
            result.data = queryResult[0];
        } 
        else{
          result.message = "failed to get activity data"
        }
      } 
      catch(e){
        result.message = "Unable to fetch activity data";
      }
      return result;
}

module.exports = {fetchAllRecentActivity, addNewRecentActivity, createRecentActivityforUser, fetchLatestFourActivities};