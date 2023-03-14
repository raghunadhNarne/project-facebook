const jwt = require('jsonwebtoken')
async function loginValidate(jwtToken) {
    let result = {
        success: false,
        message: "",
        url : "sign.html"
    }

    try{
        let token = jwtToken;
        if(jwt.verify(token,process.env.JWT_SECRET_KEY)){
            result.success = true;
            result.message = "Successfully validated user";
        }
        else{
            result.message = "jwt token is modified"
        }
    }
    catch(e){
        result.message = "Unable to verify user";
    }
    return result;

}



async function parentValidate(jwtToken) {
    let result = {
        success: false,
        message: "",
        url : "sign.html"
    }

    try{
        let token = jwtToken;
        if(jwt.verify(token,process.env.JWT_SECRET_KEY)){
            const decoded = jwt.decode(jwtToken);
            let isparent = await isParent(decoded.user)
            if(isparent == true){
                result.success = true;
                result.message = "Successfully validated parent";
            }
            else{
                result.message = `${decoded.user.firstName} is not parent`;
                result.url = "index.html";
            }
        }
        else{
            result.message = "jwt token is modified"
        }
    }
    catch(e){
        result.message = "Unable to verify parent";
    }

    return result;

}



async function adminValidate(jwtToken) {
    let result = {
        success: false,
        message: "",
        url : "sign.html"
    }

    try{
        let token =jwtToken;
        if(jwt.verify(token,process.env.JWT_SECRET_KEY)){
            const decoded = jwt.decode(jwtToken);
            let isadmin = await isAdmin(decoded.user)
            if(isadmin == true){
                result.success = true;
                result.message = "Successfully validated admin";
            }
            else{
                result.message = `${decoded.user.firstName} is not admin`;
                result.url = "index.html";
            }
        }
        else{
            result.message = "jwt token is modified"
        }
    }
    catch(e){
        result.message = "Unable to verify admin";
    }

    return result;

}

async function isParent(payload){
    let role = payload.role;
    return role == "Parent";
}

async function isAdmin(payload){
    let role = payload.role;
    return role == "Admin";
}


module.exports = {loginValidate, parentValidate, adminValidate}