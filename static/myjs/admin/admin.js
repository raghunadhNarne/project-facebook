window.onload=async function()
{
    let result = await validateAdmin();
    var pending_data=await $.get(backendHost+"/users/getallpendingusers")
    addallpendingusersdata(pending_data.data)
}
async function addallpendingusersdata(data)
{
    for(x in data)
    {
        $("#userspendinglist").append(
            `<li>
            <div class="nearly-pepls">
                <figure>
                    <a href="#" title=""><img src="${data[x].profilePic}" onerror="this.onerror=null; this.src='../static/images/resources/defaultUser.png'" alt="Default Image"></a>
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
    $("#imgurl").attr('src',url)
    $("#type").html(type)
}

async function acceptrequest(email,type)
{
    let data = await $.post(backendHost+"/users/acceptpendingrequest",{email:email,type:type})
    alert("successfully accepted the user request")
}

async function deleterequest(email)
{
    let data = await $.post(backendHost+"/users/deletependingrequest",{email:email})
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
        url: backendHost+'/ads/addnewad',
        contentType: false,
        data: form,
        success: function (data) {
            alert("successfully added the ad data")
        }
    })
})