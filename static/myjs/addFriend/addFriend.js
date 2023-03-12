window.onload=async ()=>{
    let email=window.location.hash.substring(1);

    let totalFriendsAndFollowers = await $.post("http://localhost:7777/friends/totalfriendandfollowers",{email:email})
    $("#followers").text(totalFriendsAndFollowers.data.followers)
    alert(totalFriendsAndFollowers.data.followers)

    let data = await $.post("http://localhost:7777/users/getsingleuser",{email:email})
    var userData = data.data

    $("#name").text(userData.firstName+" "+userData.lastName)
    $("#firstName").text(userData.firstName+" "+userData.lastName)
    $("#email").text(userData.email)
    $("#mobileNo").text(userData.mobileNo)
    $("#city").text(userData.city)
    $("#dob").text(userData.dob)

    if(userData.profilePic!=null)
    $("#profile-photo").attr('src',"../"+userData.profilePic)
    if(userData.coverPic!=null)
    $("#cover-photo").attr('src',"../"+userData.coverPic)
}