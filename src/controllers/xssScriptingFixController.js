const { purifyDOM } = require("../utils/xssScriptingFixUtils");


async function sanitizeDOM(req,res){
    let dom = req.body;
    // console.log("inside controller",dom.postText);
    let result = await purifyDOM(dom.postText);

    res.send(result);
}

module.exports = {sanitizeDOM};