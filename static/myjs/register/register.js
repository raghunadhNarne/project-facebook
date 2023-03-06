$('#register').on("click",function(e) {
    e.preventDefault();
    
    var email = $('input[name="email"]').val();
    var password = $('input[name="password"]').val();
    // console.log("here");
    $.ajax({
      url: 'http://localhost:7777/login',
      type: 'POST',
      data: {email: email, password: password},
      success: function(data){
        console.log("forntend token",data.data);
        if(data.success == true){
            document.cookie = 'jwtToken=' + JSON.stringify(data.data);
            window.location.href = '/static/index.html';
        }
        else{
            alert(data.message);
        }
      },
      error: function(){
        alert('Invalid email or password');
        setTimeout(()=>window.location.href = 'http://localhost:5500/static/404.html',1000);
      }
    });
  });