const { getchats, insertmessage } = require("../utils/chatUtils");

async function fetchchating(req,res) {

    let requiredDetails = req.body;

    let result = await getchats(requiredDetails);
    res.send(result);
}



async function putmessage(req,res) {

    let requiredDetails = req.body;
    
    let result = await insertmessage(requiredDetails);
    res.send(result);;
}


module.exports = { fetchchating, putmessage }