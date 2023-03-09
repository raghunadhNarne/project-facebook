const { groupChatModel } = require("../models/groupChatMode");

async function getchats(requiredDetails) {
    let result = {
        success: false,
        message: "",
        data: ""
    }

    let obj = {
        chatRoom: requiredDetails.chatRoom,
    }

    try{
        let data = await groupChatModel.findOne({chatRoom:obj.chatRoom});
        result.success = true;
        result.message = "Successfully fetched the messages";
        result.data = data;

    }
    catch(e){
        result.message = "Unable to fetch the messages";
    }

    return result;

}


async function insertmessage(requiredDetails) {
    let result = {
        success: false,
        message: "",
        data: ""
    }

    let obj = {
        chatRoom: requiredDetails.chatRoom,
        message: requiredDetails.message
    }

    try {
        let data = await groupChatModel.findOne({ chatRoom: obj.chatRoom });

        if (data == undefined) {
            let usersChat = new groupChatModel(obj);
            await usersChat.save();
        }

        await groupChatModel.updateOne({ chatRoom: obj.chatRoom }, { $push: { messages: obj.message } });

        result.success = true;
        result.message = "Succesfully added message";
    }
    catch (e) {
        result.message = "Unable to add the message";
    }

    return result;
}


module.exports = { getchats, insertmessage }