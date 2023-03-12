const mongoose=require("./conn").mongoose;


//defining recentActivity schema
let notificationsSchema = {
    email : {type:String},
    notifications : {type:Array},
}

    // timeStamp : {type:String},
    // name : {type:String}, name is on whose post the current user did action
    // action : {type:String}


//creating notifications model
let notificationsModel = mongoose.model("notifications",notificationsSchema);


module.exports = {notificationsModel};