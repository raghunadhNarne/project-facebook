async function validateUser(){
    try{
        let jwtToken = localStorage.getItem("jwtToken");
        jwtToken = jwtToken;
        let jwt = {
            jwtToken : jwtToken
        }
        let result = await $.post(backendHost+'/auth/login',jwt)
        if(jwtToken == null){
            window.location.href = "signin.html"
        }
        else if(result.success == false){
            window.location.href = result.url
        }
    }
    catch{
        // alert("you are not logged in...")
        setTimeout(()=>{
            window.location.href = "signin.html";
        },100)
    }
}


async function validateParent(){
    try{
        let jwtToken = localStorage.getItem('jwtToken');
        jwtToken = jwtToken;
        let jwt = {
            jwtToken : jwtToken
        }
        let result = await $.post(backendHost+'/auth/parent',jwt)
        if(result.success == false){
            window.location.href = result.url
        }
    }
    catch{
        // alert("you are not logged in...")
        setTimeout(()=>{
            window.location.href = "signin.html";
        },100)
    }
}


async function validateAdmin(){
    try{
        let jwtToken = localStorage.getItem('jwtToken');
        jwtToken = jwtToken;
        let jwt = {
            jwtToken : jwtToken
        }
        let result = await $.post(backendHost+'/auth/admin',jwt)
        if(result.success == false){
            window.location.href = result.url
        }
    }
    catch{
        // alert("you are not logged in...")
        setTimeout(()=>{
            window.location.href = "signin.html";
        },100)
    }
}