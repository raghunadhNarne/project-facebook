$('#register').on("click",function(e) {
    e.preventDefault();
    
    var email = $('input[name="email"]').val();
    var password = $('input[name="password"]').val();
    // console.log("here");
    $.ajax({
      url: backendHost+'/login',
      type: 'POST',
      data: {email: email, password: password},
      success: function(data){
        // console.log("forntend token",data.data);
        if(data.success == true){
            document.cookie = 'jwtToken=' + JSON.stringify(data.data);
            window.location.href = '/static/index.html';
        }
        else{
            
        }
      },
      error: function(){
        Swal.fire({
          icon: 'error',
          title: 'Invalid email or password',
          
          showConfirmButton: false, 
          allowOutsideClick: false, 
          timer:1500
          
        });
        setTimeout(()=>window.location.href = 'http://localhost:5500/static/404.html',1000);
      }
    });
  });