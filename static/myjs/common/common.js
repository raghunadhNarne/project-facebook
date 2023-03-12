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
        url : "http://127.0.0.1:5500/static/liveVedio.html#"+userData.email
    }
    let data = await $.post("http://localhost:7777/notifications/notifyAllFriends",obj);
})