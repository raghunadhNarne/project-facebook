const {createUser} = require('../utils/signupUtils')

async function signup(req,res){
    let userDetails = req.body;

    let result = await createUser(userDetails);
    res.send(result);
}

module.exports = {signup};