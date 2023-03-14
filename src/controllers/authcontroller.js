const { loginValidate, parentValidate, adminValidate} = require("../utils/authUtils");

async function checkLogin(req,res){
    let token = req.body;

    let result = await loginValidate(token.jwtToken);
    res.send(result);
}


async function authParent(req,res){
    let token = req.body;

    let result = await parentValidate(token.jwtToken);
    res.send(result);
}


async function authAdmin(req,res){
    let token = req.body;
    let result = await adminValidate(token.jwtToken);
    res.send(result);
}

module.exports = {checkLogin, authParent, authAdmin}