async function userAuth(req,res,next){
    result = {
        success : false,
        message : "You are Unauthorized",
        data : ""
    }

    var token = req.cookies.jwtToken;
    if (!token) {
      return res.redirect('/404.html');
    }
  
    jwt.verify(token, secretKey, function(err, decoded) {
      if (err) {
        return res.redirect('/404.html');
      }
      if (decoded.role !== 'user') {
        return res.redirect('/404.html');
      }
      req.userData = decoded;
      next();
    });
}




async function adminAuth(req,res,next){
    result = {
        success : false,
        message : "You are Unauthorized",
        data : ""
    }
    var token = req.cookies.jwtToken;
    if (!token) {
      return res.redirect('/404.html');
    }
  
    jwt.verify(token, secretKey, function(err, decoded) {
      if (err) {
        return res.redirect('/404.html');
      }
      if (decoded.role !== 'admin') {
        return res.redirect('/404.html');
      }
      req.userData = decoded;
      next();
    });
}


module.exports  ={userAuth,adminAuth};