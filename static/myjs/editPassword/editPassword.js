window.onload=function(){
    // alert()
    var userData=JSON.parse(localStorage.getItem("userData"));
    $("#name").text(userData.firstName+" "+userData.lastName)
    $("#profile-photo").attr('src',"../"+userData.profilePic)
    $("#cover-photo").attr('src',"../"+userData.coverPic)

}
$("#update").click(async function(){
    var current_password = $("#current-password").val()
    var new_password = $("#new-password").val()
    var confirm_password = $("#confirm-password").val()
    if(current_password!=JSON.parse(localStorage.getItem("userData")).password)
    {
        alert("Please! Enter correct current password")
    }
    else if(new_password!=confirm_password)
    {
        alert("Please! Enter correct confirm password")
    }
    else
    {
        var obj = {
            email:JSON.parse(localStorage.getItem("userData")).email,
            new:new_password,
        }
        var data= await $.post("http://localhost:7777/users/changepassword",obj)
        alert(data.message)
    }
    
})