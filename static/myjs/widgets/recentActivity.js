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
    let recentActivityData = []
    try{
        obj = {
            email: JSON.parse(localStorage.getItem("userData")).email
        }
        let result = await $.post(backendHost+"/recentActivity/getMyRecentActivity", obj);
        recentActivityData = result.data;
    }
    catch(e){
        console.log("recent activity widet rendering failed...")
    }

    return recentActivityData?.activities || [];
}





async function renderRecentActivity(){
    let recentActivityData = await getLatestFourActivityData();
    let limit = Math.min(4,recentActivityData.length)


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
    

    let recentActivityData =[];
    try{
        obj = {
            email: JSON.parse(localStorage.getItem("userData")).email
        }
        let result = await $.post(backendHost+"/recentActivity/getMyLatestFourActivities", obj);
        recentActivityData = result.data;
    }
    catch(e){
        console.log("recent activity rendering failed")
    }

    return recentActivityData?.activities || [];
}



renderRecentActivity();