
async function logoutUser(){
    localStorage.removeItem("userData");
    alert("loggging out...")

    var now = new Date();
    now.setTime(now.getTime() - 1);
    document.cookie = "jwtToken=; expires=" + now.toUTCString() + "; path=/;";

    window.location.href = "login.html"

}

$("#logout").on("click", logoutUser);