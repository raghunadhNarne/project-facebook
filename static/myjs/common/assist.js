let recognition;
$(".assistant").click(() => {
    recognition = new webkitSpeechRecognition();
    recognition.interimResults = true;

    recognition.start();

    let command = "";

    recognition.onresult = (event) => {
        command = event.results[0][0].transcript;

        if (command.includes("tab") && command.includes("groups")) {
            window.location.href = "groups.html";
        }

        if (command.includes("my") && command.includes("groups")) {
            document.getElementById("mygrpstab").click();
        }


        if (command.includes("request") && command.includes("group")) {
            document.getElementById("grprequeststab").click();
        }


        if (command.includes("search") && command.includes("groups")) {
            document.getElementById("searchgrpstab").click();
        }


        if (command.includes("create") && command.includes("group")) {

            document.getElementById("creategrpstab").click();
        }

        if (command.includes("notifications")) {
            window.location.href = "notifications.html";
        }

        if (command.includes("chat") && command.includes("friends")) {
            window.location.href = "chat.html";
        }


        if (command.includes("friends") && command.includes("tab")) {
            window.location.href = "friendRequests.html"
        }


        if (command.includes("my") && command.includes("friends")) {
            document.getElementById("myfrends-nav").click()
        }


        if (command.includes("friend") && command.includes("request")) {
            document.getElementById("frendsreqs-nav").click()
        }


        if (command.includes("friend") && command.includes("request") && command.includes("my")) {
            document.getElementById("myfrendsreq-nav").click()
        }

        if (command.includes("friends") && command.includes("search")) {
            document.getElementById("searchfrendreq-nav").click()
        }

        if (command.includes("my") && command.includes("following")) {
            document.getElementById("myfollowing-nav").click()
        }

        if (command.includes("profile") && command.includes("my")) {
            window.location.href = "profile.html"
        }

        if(command.includes("start") && command.includes("live")){
            window.location.href="liveVedio.html#"+userData.email;
        }

    }

    setTimeout(closepopup,7000);

})






// let command = "open my friends search groups group requests create group notifications friends chat friends tab friend following profile"


