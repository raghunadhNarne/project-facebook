window.onload=function(){
    // alert('jljl')
}
$("#addchildren").click(async ()=>{
    var firstname=$("#firstname").val()
    var lastname=$("#lastname").val()
    var email=$("#email").val()
    var password=$("#password").val()
    var dob=$("#dob").val()
    var gender=$("input[type='radio'][name='radio']:checked").val();
    var parent=JSON.parse(localStorage.getItem("userData")).email
    
    dob = new Date(dob);
    var month_diff = Date.now() - dob.getTime();
    var age_dt = new Date(month_diff);
    var year = age_dt.getUTCFullYear();
    var age = Math.abs(year - 1970);
    
    var obj={
        firstName:firstname,
        lastName:lastname,
        email:email,
        password:password,
        dob:$("#dob").val(),
        gender:gender,
        age:age,
        parent:parent
    }

    await postchilddata(obj)

})

async function postchilddata(obj)
{
    let data = await $.post("http://localhost:7777/users/addchild",obj)
    alert("successfully posted child data")
}