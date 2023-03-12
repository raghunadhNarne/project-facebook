
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
    
            var now = new Date();
            now.setTime(now.getTime() - 1);
            document.cookie = "jwtToken=; expires=" + now.toUTCString() + "; path=/;";
    
            window.location.href = "login.html"
        },});
}

if(respone.success)
              {
                Swal.fire({
                  icon: 'success',
                  title: respone.message,
                  
                  showConfirmButton: false, 
                  allowOutsideClick: false, 
                  timer:5200
                  
                });
                setTimeout(()=>window.location.replace('/'),2000);
                return ;
              }
            else
            {
              Swal.fire({
                icon: 'error',
                
                title: respone.message,
        
                
              });
            }