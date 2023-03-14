window.onload=async function(){
    let result = await validateUser();
    // alert()
    var userData=JSON.parse(localStorage.getItem("userData"));
    $("#name").text(userData.firstName+" "+userData.lastName)
    if(userData.profilePic!=null)
    $("#profile-photo").attr('src',userData.profilePic)
    if(userData.coverPic!=null)
    $("#cover-photo").attr('src',userData.coverPic)

}
$("#update").click(async function(){
    var new_password = $("#new-password").val()
    var confirm_password = $("#confirm-password").val()
    if(new_password!=confirm_password)
    {
        Swal.fire({
            icon: 'error',
            title: "Please Enter correct confirm password",
            
            showConfirmButton: false, 
            allowOutsideClick: false, 
            timer:1500
            
          });
    }
    else
    {
        var obj = {
            email:JSON.parse(localStorage.getItem("userData")).email,
            new:new_password,
        }
        var data= await $.post(backendHost+"/users/changepassword",obj)
        Swal.fire({
            icon: 'success',
            title: data.message,
            
            showConfirmButton: false, 
            allowOutsideClick: false, 
            timer:1500
            
          });
    }
    
})