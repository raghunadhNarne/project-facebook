window.onload=async function()
{
    var pending_data=await $.get("http://localhost:7777/users/getallpendingusers")
    addallpendingusersdata(pending_data.data)
}
async function addallpendingusersdata(data)
{
    for(x in data)
    {
        console.log(data[x])
        $("#userspendinglist").append(
            `<li>
            <div class="nearly-pepls">
                <figure>
                    <a href="time-line.html" title=""><img src="images/resources/friend-avatar9.jpg" alt=""></a>
                </figure>
                <div class="pepl-info">
                    <h4><a href="time-line.html" title="">${data[x].firstName}</a></h4>
                    <span style="cursor:pointer" data-toggle="modal" data-target="#exampleModalCenter" onclick="uploadimage('${data[x].authfile}','${data[x].requested}')">View file</span>
                    <a href="#" title="" class="add-butn more-action" data-ripple="" onclick="deleterequest('${data[x].email}')">Delete</a>
                    <a href="#" title="" class="add-butn" data-ripple="" onclick="acceptrequest('${data[x].email}','${data[x].requested}')">Accept</a>
                </div>
            </div>
        </li>`
        )
    }
}

async function uploadimage(url,type)
{
    $("#imgurl").attr('src',"../"+url)
    $("#type").html(type)
}

async function acceptrequest(email,type)
{
    let data = await $.post("http://localhost:7777/users/acceptpendingrequest",{email:email,type:type})
    alert("successfully accepted the user request")
}

async function deleterequest(email)
{
    let data = await $.post("http://localhost:7777/users/deletependingrequest",{email:email})
    alert("successfully deleted the user request")
}

$("#submitad").click(function(){
    let form=new FormData(document.getElementById("addata"));
    let company=$("#company").val();
    let file=document.getElementById('image').files[0]
    let link=$("#link").val()
    form.set("image",file)
    form.set("company",company)
    form.set("link",link)
    
    // alert(form.get("link"))
    $.ajax({
        method: 'POST',
        processData: false,
        url: 'http://localhost:7777/ads/addnewad',
        contentType: false,
        data: form,
        success: function (data) {
            alert("successfully added the ad data")
        }
    })
})