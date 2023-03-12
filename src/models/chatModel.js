const mongoose = require('./conn').mongoose


var chatSchema = new mongoose.Schema({
    chatRoom: { type: String },
    messages: { type: Array }
})


chatSchema.index({chatRoom:1})
 

const chatModel = mongoose.model("chats",chatSchema);

module.exports = {chatModel};