window.onload=async function()
{
    let result = await validateUser();

    
    var userData=JSON.parse(localStorage.getItem("userData"));

    let totalFriendsAndFollowers = await $.post(backendHost+"/friends/totalfriendandfollowers",{email:userData.email})
    $("#followers").text(totalFriendsAndFollowers.data.followers)
    $("#friends").text(totalFriendsAndFollowers.data.friends)

    $("#name").text(userData.firstName+" "+userData.lastName)
    $("#firstName").text(userData.firstName+" "+userData.lastName)
    $("#email").text(userData.email)
    $("#mobileNo").text(userData.mobileNo)
    $("#city").text(userData.city)
    $("#dob").text(userData.dob)
    if(userData.profilePic!=null)
    $("#profile-photo").attr('src',userData.profilePic)
    if(userData.coverPic!=null)
    $("#cover-photo").attr('src',userData.coverPic)
    $("#aboutMe").text(userData.aboutMe)
}