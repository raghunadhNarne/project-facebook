const { validateCredentials } = require("../utils/loginUtils");


async function validateUser(req,res){
    let loginDetails = req.body;

    let result = await validateCredentials(loginDetails);

    res.send(result);
}

module.exports = {validateUser};