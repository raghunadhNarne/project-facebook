async function renderAllRecentActivity(){
    let recentActivityData = await getRecentActivityData();
    let limit = Math.min(4,recentActivityData.length)
    // console.log(recentActivityData,"0000");

    for(let recentActivity = 0; recentActivity < limit; recentActivity++){
        // console.log(recentActivityData[recentActivity].timeStamp)
        $("#activitiez").append(
            `<li>
                <div class="activity-meta">
                    <i>${recentActivityData[recentActivity].timeStamp}</i>
                    <span><a href="#" title=""> ${recentActivityData[recentActivity].action} on Post</a></span>
                    <h6>by <a href="#">${recentActivityData[recentActivity].name}.</a></h6>
                </div>
            </li>`
        )        
    }
}



async function getRecentActivityData(){
    obj = {
        email: JSON.parse(localStorage.getItem("userData")).email
    }
    // console.log(obj);
    let result = await $.post("http://localhost:7777/recentActivity/getMyRecentActivity", obj);

    let recentActivityData = result.data;
    // console.log(recentActivityData.activities,"recentActivityData")

    return recentActivityData ? recentActivityData.activities : [];
}





async function renderRecentActivity(){
    let recentActivityData = await getLatestFourActivityData();
    let limit = Math.min(4,recentActivityData.length)
    // console.log(recentActivityData)

    for(let recentActivity = limit - 1; recentActivity >= 0; recentActivity--){
        $("#activitiez").append(
            `<li>
                <div class="activity-meta">
                    <i>${recentActivityData[recentActivity].timeStamp}</i>
                    <span><a href="#" title=""> ${recentActivityData[recentActivity].action} on Post</a></span>
                    <h6>by <a href="#">${recentActivityData[recentActivity].name}.</a></h6>
                </div>
            </li>`
        )        
    }
}



async function getLatestFourActivityData(){
    obj = {
        email: JSON.parse(localStorage.getItem("userData")).email
    }

    let result = await $.post("http://localhost:7777/recentActivity/getMyLatestFourActivities", obj);

    let recentActivityData = result.data;
    console.log(recentActivityData,"recentActivityData")

    return recentActivityData ? recentActivityData.activities : [];
}



renderRecentActivity();