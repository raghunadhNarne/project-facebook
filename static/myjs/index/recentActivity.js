$("#activitiez").append(
    `<li>
        <div class="activity-meta">
            <i>10 hours Ago</i>
            <span><a href="#" title="">Commented on Video posted </a></span>
            <h6>by <a href="time-line.html">black demon.</a></h6>
        </div>
    </li>`
)



async function renderRecentActivity(){
    let recentActivityData = await getRecentActivityData();
    let limit = Math.min(4,recentActivityData.length)
    console.log(recentActivityData);

    for(let recentActivity = 0; recentActivity < limit; recentActivity++){
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
    let result = await $.post("http://localhost:7777/recentActivity/getMyRecentActivity", obj);

    let recentActivityData = result.data;
    // console.log(recentActivityData,"recentActivityData")

    return recentActivityData.activities;
}



renderRecentActivity();