const mongoose = require('./conn').mongoose


var chatSchema = {
    chatRoom: { type: String },
    messages: { type: Array }
}


const chatModel = mongoose.model("chats",chatSchema);

module.exports = {chatModel};