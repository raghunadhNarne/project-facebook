const mongoose=require('./conn.js').mongoose

//defining group schema
var groupSchema = new mongoose.Schema({
    groupName : {type:String},
    groupPic : {type:String},
    groupOwnerName : {type:String},
    groupOwnerEmail : {type:String},
    groupOwnerPic : {type:String},
    senderName : {type:String},
    senderEmail : {type:String},
    senderPic : {type:String},
    status : {type:String}
})


groupSchema.index({groupName:1})
groupSchema.index({groupOwnerEmail:1,senderEmail:1})
groupSchema.index({senderEmail:1,status:1})

//creating group model
var groupModel = mongoose.model("groups",groupSchema);

module.exports = {groupModel};