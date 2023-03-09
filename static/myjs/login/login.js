$('#login').on("click", function(e) {
    e.preventDefault();
  
    var email = $('input[name="email"]').val();
    var password = $('input[name="password"]').val();
    // console.log("here");
    $.ajax({
      url: 'http://localhost:7777/login',
      type: 'POST',
      xhrFields: {
        withCredentials: true // enable sending cookies
      },
      data: { email: email, password: password },
      success: function(data) {
        console.log("frontend token", data.data);
        if (data.success == true) {
          var expiresDate = new Date();
          expiresDate.setDate(expiresDate.getDate() + 7); // set expiration time to 7 days from now
          document.cookie = "jwtToken=" + JSON.stringify(data.data) + "; path=/; expires=" + expiresDate.toUTCString();


          //copying user details into local storage
          let token =JSON.stringify(data.data);
          console.log("data.data",data.data)
          var base64Url = token.split(".")[1];
          var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
          jsonPayload = JSON.parse(jsonPayload);
          localStorage.setItem('userData',JSON.stringify(jsonPayload.user));

          console.log(localStorage.getItem('userData'));
          
          window.location.href = '/static/index.html';
        } else {
          alert(data.message);
        }
      },
      error: function() {
        alert('Invalid email or password');
        setTimeout(function() { window.location.href = 'http://localhost:5500/static/404.html'; }, 1000);
      }
    });
  });
  