const mongoose=require('./conn').mongoose

//declaring friends schema
let friendsSchema={
    senderEmail:{type:String},
    senderPic:{type:String},
    senderName:{type:String},
    receiverEmail:{type:String},
    receiverPic:{type:String},
    receiverName:{type:String},
    status:{type:String}
}

//creating friends collection
var friendsModel=mongoose.model("friends",friendsSchema)
module.exports={friendsModel}

