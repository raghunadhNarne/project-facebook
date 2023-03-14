
async function logoutUser(){
    Swal.fire({
        showCancelButton: true,
        confirmButtonText: 'Logout',
        icon:"warning",
        title:"Are your sure?",
        showLoaderOnConfirm: true,
        allowOutsideClick: false,
        preConfirm:  () => {
            localStorage.removeItem("userData");
            localStorage.removeItem("jwtToken");
    
            var now = new Date();
            now.setTime(now.getTime() - 1);
            document.cookie = "jwtToken=; expires=" + now.toUTCString() + "; path=/;";
    
            window.location.href = "sign.html"
        },});
}