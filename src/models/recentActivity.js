const mongoose=require("./conn").mongoose;


//defining recentActivity schema
let recentActivitySchema = {
    email : {type:String},
    activities : {type:Array},
}

    // timeStamp : {type:String},
    // name : {type:String}, name is on whose post the current user did action
    // action : {type:String}


//creating recentActivity model
let recentActivityModel = mongoose.model("recentActivities",recentActivitySchema);


module.exports = {recentActivityModel};