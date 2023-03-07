window.onload=function(){
    // alert('jljl')
}
$("#addchildren").click(()=>{
    var firstname=$("#firstname").val()
    var lastname=$("#lastname").val()
    var mobileno=$("#mobileno").val()
    var email=$("#email").val()
    var dob=$("#dob").val()
    var city=$("#city").val()
    var country=$("#country").val()
    var aboutme=$("#aboutme").val()
    var gender=$("input[type='radio'][name='radio']:checked").val();
    
    dob=new Date(dob);
    
    var years=(new Date()).getFullYear()-dob.getFullYear();
    var months=(new Date()).getMonth()-dob.getMonth()
        alert(years+" "+months)
    
})