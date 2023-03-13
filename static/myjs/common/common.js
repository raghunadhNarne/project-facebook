function popsup(){
    document.getElementById("popup").className="showpopup";
}

function closepopup(){
    recognition.stop();
    document.getElementById("popup").className="closepopup";
}




$("#strtlive").click(async ()=>{
    let obj = {
        name :userData.firstName,
        email : userData.email,
        action : "started live",
        url : frontendHost+"/liveVedio.html#"+userData.email
    }
    let data = await $.post(backendHost+"/notifications/notifyAllFriends",obj);
})




backendHost = "http://18.224.56.252";
// backendHost = "http://localhost:7777"
frontendHost = "http://18.220.86.145/project-facebook/static";
peerHost = "http://18.224.56.154";