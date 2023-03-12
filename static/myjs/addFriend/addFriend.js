window.onload=async ()=>{
    let email=window.location.hash.substring(1);
    let data = await $.post("http://localhost:7777/users/getsingleuser",{email:email})
    console.log(data.data)
    var userData = data.data

    $("#name").text(userData.firstName+" "+userData.lastName)
    $("#firstName").text(userData.firstName+" "+userData.lastName)
    $("#email").text(userData.email)
    $("#mobileNo").text(userData.mobileNo)
    $("#city").text(userData.city)
    $("#dob").text(userData.dob)
    $("#profile-photo").attr('src',"../"+userData.profilePic)
    $("#cover-photo").attr('src',"../"+userData.coverPic)
}