async function validateUser(){
    try{
        let jwtToken = localStorage.getItem(jwtToken);
        jwtToken = JSON.stringify(jwtToken);
        let jwt = {
            jwtToken : jwtToken
        }
        let result = $.post(backendHost+'/auth/login',jwt)
        if(result.success === false){
            window.location.href = "login.html"
        }
    }
    catch{
        alert("you are not logged in...")
        setTimeout(()=>{
            window.location.href = "login.html";
        },100)
    }
}


async function validateParent(){
    try{
        let jwtToken = localStorage.getItem(jwtToken);
        jwtToken = JSON.stringify(jwtToken);
        let jwt = {
            jwtToken : jwtToken
        }
        let result = $.post(backendHost+'/auth/parent',jwt)
        if(result.success === false){
            window.location.href = "login.html"
        }
    }
    catch{
        alert("you are not logged in...")
        setTimeout(()=>{
            window.location.href = "login.html";
        },100)
    }
}


async function validateAdmin(){
    try{
        let jwtToken = localStorage.getItem(jwtToken);
        jwtToken = JSON.stringify(jwtToken);
        let jwt = {
            jwtToken : jwtToken
        }
        let result = $.post(backendHost+'/auth/admin',jwt)
        if(result.success === false){
            window.location.href = "login.html"
        }
    }
    catch{
        alert("you are not logged in...")
        setTimeout(()=>{
            window.location.href = "login.html";
        },100)
    }
}