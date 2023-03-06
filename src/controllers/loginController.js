const { validateCredentials } = require("../utils/loginUtils");
const jwt = require('jsonwebtoken');


async function validateUser(req,res){
    let loginDetails = req.body;

    let result = await validateCredentials(loginDetails);



    if(result.success == false){
        // console.log("hi");
        res.send(result);
    }

    else{
        let user = result.data;
        // console.log("user",user);
        let token = jwt.sign({user}, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
        // console.log(token)
        result.success = true;
        result.data = token;
        res.cookie('jwtToken', token, { httpOnly: true, sameSite: 'strict' }).send(result);
    }
}

module.exports = {validateUser};