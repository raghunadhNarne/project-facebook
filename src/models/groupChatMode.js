const mongoose = require('./conn').mongoose


const groupChatSchema = new mongoose.Schema({
    chatRoom: { type: String },
    messages: { type: Array }
})


groupChatSchema.index({chatRoom:1})



const groupChatModel = mongoose.model('groupchats',groupChatSchema);


module.exports = {groupChatModel};