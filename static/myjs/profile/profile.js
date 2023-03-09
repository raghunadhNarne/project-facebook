window.onload=function()
{
    var userData=JSON.parse(localStorage.getItem("userData"));
    $("#name").text(userData.firstName+" "+userData.lastName)
    $("#firstName").text(userData.firstName+" "+userData.lastName)
    $("#email").text(userData.email)
    $("#mobileNo").text(userData.mobileNo)
    $("#city").text(userData.city)
    $("#dob").text(userData.dob)
    $("#profile-photo").attr('src',"../"+userData.profilePic)
    $("#cover-photo").attr('src',"../"+userData.coverPic)
}