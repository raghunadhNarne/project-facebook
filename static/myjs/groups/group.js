let userData = JSON.parse(localStorage.getItem("userData"));
window.onload = async () => {
    var obj = {
        email: userData.email,
        status: "accepted"
    }

    let myGrps = await $.post(backendHost+"/groups/getMyGroups", obj);
    madeMyGrps(myGrps.data);
    obj = {
        email: userData.email
    }
    let grpsOfMe = await $.post(backendHost+"/groups/getGroupsCreatedByMe", obj);
    madeGrpsOfMe(grpsOfMe.data);
}


function madeGlobalGrps(arr) {
    $("#globalgrpslist").html("")
    for (x in arr) {
        data = arr[x]._id;
        $("#globalgrpslist").append(
            `<li class="globalgrps" style="cursor:pointer">
                <div class="nearly-pepls">
                    <figure>
                        <a href="time-line.html" title=""><img
                                src="${data.groupPic}"
                                alt=""></a>
                    </figure>
                    <div class="pepl-info">
                        <h4><a href="time-line.html" title="">${data.groupName}</a>
                        </h4>
                        <span>ftv model</span>
                        <a href="#" title="" class="add-butn"
                            data-ripple="" onclick = "makegrprequest('${data.groupPic}','${data.groupName}','${data.groupOwnerEmail}','${data.groupOwnerPic}','${data.groupOwnerName}')">Ask To Join</a>
                    </div>
            </div>
        </li>`
        )
    }
}

async function makegrprequest(groupPic1, groupName1, groupOwnerEmail1, groupOwnerPic1, groupOwnerName1) {
    let obj = {
        groupName: groupName1,
        groupPic: groupPic1,
        groupOwnerName: groupOwnerName1,
        groupOwnerEmail: groupOwnerEmail1,
        groupOwnerPic: groupOwnerPic1,
        senderName: userData.firstName+" "+userData.lastName,
        senderEmail: userData.email,
        senderPic: userData.profilePic,
        status: "pending"
    }
    let data = await $.post(backendHost+"/groups/joinRequest", obj);
    alert(data.message);
}


function madeMyGrps(arr) {
    for (x in arr) {
        let data = arr[x];
        $("#mygrplist").append(
            `<li style="cursor: pointer;" onclick=opengrp('${data.groupName}')>
                <div class="nearly-pepls">
                    <figure>
                        <a href="time-line.html" title=""><img
                                src="${data.groupPic}"
                                alt=""></a>
                    </figure>
                    <div class="pepl-info">
                        <h4><a href="time-line.html" title="">${data.groupName}</a>
                        </h4>
                        <span>ftv model</span>
                        <a href="#" title="" class="add-butn"
                            data-ripple="" onclick="exitgrp('${data.groupName}')">Exit Group</a>
                    </div>
                </div>
            </li>`
        )
    }
}

function opengrp(grpName){
    window.location.href="groupIndex.html#"+grpName;
}

function exitgrp(grpname) {
    let obj = {
        email: userData.email,
        groupName: grpname
    }
    let data = $.post(backendHost+"/groups/leaveGroup", obj);
    alert(data);
    alert(data.message);
}

function madeGrpsOfMe(arr) {
    for (x in arr) {
        let data = arr[x];
        $("#mygrprequestlist").append(
            `<li style="cursor: pointer;">
                <div class="nearly-pepls">
                    <figure>
                        <a href="time-line.html" title=""><img
                                src="${data.groupPic}"
                                alt=""></a>
                    </figure>
                    <div class="pepl-info">
                        <h4><a href="time-line.html" title="">${data.groupName}</a>
                        </h4>
                        <span>ftv model</span>
                        <a href="#" title="" class="add-butn"
                            id='viewreqs' data-ripple="" data-toggle="modal" data-target="#myModal" onclick="showrequest('${data.groupName}')">View Requests</a>
                    </div>
                </div>
            </li>`
        )
    }
}

async function showrequest(grpname) {
    let obj = {
        status: "pending",
        email: userData.email,
        groupName: grpname
    }
    let specificGrpRequests = await $.post(backendHost+"/groups/groupRequests", obj);
    appendrequests(specificGrpRequests.data, grpname);
    $("myModal").modal('show');
}


function appendrequests(arr, grpname) {
    $("#specificgrprequests").html("")
    for (x in arr) {
        data = arr[x];
        $("#specificgrprequests").append(
            `<li>
            <div class="nearly-pepls">
                <figure>
                    <a href="time-line.html" title=""><img src="${data.senderPic}" alt=""></a>
                </figure>
                <div class="pepl-info">
                    <h4><a href="time-line.html" title="">${data.senderName}</a></h4>
                    <a href="#" title="" class="add-butn more-action" data-ripple="" onclick="rejectgrp('${data.senderEmail}','${grpname}')">Reject</a>
                    <a href="#" title="" class="add-butn" data-ripple="" onclick="acceptgrp('${data.senderEmail}','${grpname}')">Accept</a>
                </div>
            </div>
        </li>`
        );
    }
}


async function acceptgrp(senderEmail, grpname) {
    let obj = {
        email: userData.email,
        senderEmail: senderEmail,
        groupName: grpname,
        status: "accepted"
    }
    let data = await $.post(backendHost+"/groups/acceptOrRejectRequest", obj);
    alert(data.message)
}

async function rejectgrp(senderEmail, grpname) {
    let obj = {
        email: userData.email,
        senderEmail: senderEmail,
        groupName: grpname,
        status: "rejected"
    }
    let data = await $.post(backendHost+"/groups/acceptOrRejectRequest", obj);
    alert(data.message)
}




$("#grpsearch").keyup(async () => {
    // let input = $("#grpsearch").val().toLowerCase();
    // let groups = $(".globalgrps");
    // for (let i = 0; i < groups.length; i++) {
    //     let grpName = groups[i].childNodes[1].childNodes[3].childNodes[1].childNodes[0].innerHTML;
    //     if (!grpName.toLowerCase().includes(input)) {
    //         groups[i].style.display = "none";
    //     }
    //     else {
    //         groups[i].style.display = "block"
    //     }
    // }
    obj = {
        email: userData.email,
        input: $("#grpsearch").val().toLowerCase()
    }
    let globalGrps = await $.post(backendHost+"/groups/getNotMyGroups", obj);
    madeGlobalGrps(globalGrps.data);

})



$("#createGrp").click(async () => {
    let objt = {
        postText : $("#grpnameinput").val()
    } 
    let purifiedText = await $.post(backendHost+"/xssScriptingFix/sanitizeDOM", objt);
    let puredText = purifiedText.cleanedDOM;

    let obj = new FormData();
    obj.append("groupName", puredText);
    obj.append("groupPic", document.getElementById("profilepic").files[0]);
    obj.append("groupOwnerName", userData.firstName+" "+userData.lastName);
    obj.append("groupOwnerEmail", userData.email);
    obj.append("groupOwnerPic", userData.profilePic);
    obj.append("senderName", userData.firstName+" "+userData.lastName);
    obj.append("senderEmail", userData.email);
    obj.append("senderPic", userData.profilePic);
    obj.append("status", "accepted");
    console.log(obj);
    $.ajax({
        method : "POST",
        data : obj,
        contentType : false,
        processData : false,
        url : backendHost+"/groups/createGroup",
        success : (e)=>{
            alert(e.message)
        }
    })
    // let data = await $.post(backendHost+"/groups/createGroup", obj);
    // alert(data.message);
})