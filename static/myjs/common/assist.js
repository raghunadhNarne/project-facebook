const recognition = new webkitSpeechRecognition();
recognition.interimResults = true;

recognition.start();


recognition.onresult = (event) => {
    const command = event.results[0][0].transcript;
    alert(command)

    if (command.includes("tab") && command.includes("groups")) {
        window.location.href = "groups.html";
    }

    if (command.includes("my") && command.includes("groups")) {
        window.location.href = "groups.html";
        document.getElementById("mygrpstab").click();
    }


    if (command.includes("requests") && command.includes("group")) {
        window.location.href = "groups.html";
        document.getElementById("grprequeststab").click();
    }


    if (command.includes("search") && command.includes("groups")) {
        window.location.href = "groups.html";
        document.getElementById("searchgrpstab").click();
    }


    if (command.includes("create") && command.includes("group")) {
        console.log(1000);
        window.location.href = "groups.html";
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
        window.location.href = "friendRequests.html";
        document.getElementById("myfrends-nav").click()
    }


    if (command.includes("friend") && command.includes("requests")) {
        window.location.href = "friendRequests.html";
        document.getElementById("frendsreqs-nav").click()
    }


    if (command.includes("friend") && command.includes("requests") && command.includes("my")) {
        window.location.href = "friendRequests.html";
        document.getElementById("myfrendsreq-nav").click()
    }

    if (command.includes("friends") && command.includes("search")) {
        window.location.href = "friendRequests.html";
        document.getElementById("searchfrendreq-nav").click()
    }

    if (command.includes("my") && command.includes("following")) {
        window.location.href = "friendRequests.html";
        document.getElementById("myfollowing-nav").click()
    }

    if (command.includes("profile") && command.includes("my")) {
        window.location.href = "profile.html"
    }

}



// let command = "open my friends search groups group requests create group notifications friends chat friends tab friend following profile"


