const mongoose = require('./conn').mongoose


const groupChatSchema = {
    chatRoom: { type: String },
    messages: { type: Array }
}


const groupChatModel = mongoose.model('groupchats',groupChatSchema);


module.exports = {groupChatModel};