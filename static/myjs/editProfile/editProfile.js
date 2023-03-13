window.onload=async function(){
    let result = await validateUser();
    if(result.success == false){
        alert(result.message)
        window.location.href = "login.html"
        return;
    }
    
    var userData=JSON.parse(localStorage.getItem("userData"));

    let update_data = await $.post(backendHost+"/users/getsingleuser",{email:userData.email})

    userData=update_data.data
    localStorage.setItem("userData",JSON.stringify(userData))
    $("#name").text(userData.firstName+" "+userData.lastName)
    $("#firstName").val(userData.firstName)
    $("#lastName").val(userData.lastName)
    $("#email").val(userData.email)
    $("#mobileNo").val(userData.mobileNo)
    $("#dob").val(userData.dob)
    $("#facebook").val(userData.facebookLink)
    $("#twitter").val(userData.twitterLink)
    $("#google").val(userData.googleLink)
    if(userData.gender=='Male')
        $('input:radio[name=radio]')[0].checked = true;
    else
        $('input:radio[name=radio]')[1].checked = true;

    $("#city").val(userData.city)
    $("#country").val(userData.country)
    $("#aboutMe").val(userData.aboutMe)
    if(userData.profilePic!=null)
    {
        $("#profile-photo").attr('src',userData.profilePic)
    }
        
    if(userData.coverPic!=null)
        $("#cover-photo").attr('src',userData.coverPic)

}

$("#update").click(async function(){
    // var obj = {
    //     firstName:$("#firstName").val(),
    //     lastName:$("#lastName").val(),
    //     email:$("#email").val(),
    //     mobileNo:$("#mobileNo").val(),
    //     dob:$("#dob").val(),
    //     gender:$("input[type='radio'][name='radio']:checked").val(),
    //     city:$("#city").val(),
    //     country:$("#country").val(),
    //     aboutMe:$("#aboutMe").val()
    // }

    var gender=$("input[type='radio'][name='radio']:checked").val();
    let user=new FormData(document.getElementById("updateuserdata"))
    user.set("firstName",$("#firstName").val())
    user.set("lastName",$("#lastName").val())
    user.set("email",$("#email").val())
    user.set("mobileNo",$("#mobileNo").val())
    user.set("dob",$("#dob").val())
    user.set("city",$("#city").val())
    user.set("country",$("#country").val())
    user.set("aboutMe",$("#aboutMe").val())
    user.set('gender',gender)
    user.set('profile',document.getElementById("profile").files[0])
    user.set('cover',document.getElementById('cover').files[0])
    user.set('facebook',$("#facebook").val())
    user.set('twitter',$("#twitter").val())
    user.set('google',$("#google").val())
    // console.log(user.get("profile"))


    $.ajax({
        method: 'POST',
        processData: false,
        url: backendHost+'/users/updateuser',
        contentType: false,
        data: user,
        success: function (data) {
            alert("successfully updated user data")
        }
    })

    // console.log(obj)
    // let data = await $.post(backendHost+"/users/updateuser",obj)
    // alert("successfully updated user data")
})
