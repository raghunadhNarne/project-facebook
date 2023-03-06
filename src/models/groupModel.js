const mongoose=require('./conn.js').mongoose

//defining group schema
var groupSchema = {
    groupName : {type:String},
    groupPic : {type:String},
    groupOwnerName : {type:String},
    groupOwnerEmail : {type:String},
    groupOwnerPic : {type:String},
    senderName : {type:String},
    senderEmail : {type:String},
    senderPic : {type:String},
    status : {type:String}
}

//creating group model
var groupModel = mongoose.model("groups",groupSchema);

module.exports = {groupModel};