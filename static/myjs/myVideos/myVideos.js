async function renderMyVideos(){
    let myVideos = await getMyVideos();

    $("#videos").html("")
    for(let video of myVideos){
        $("#videos").append(
            await getVideo(video)
        )
    }
}



async function getMyVideos(){
    obj = {
        email: JSON.parse(localStorage.getItem("userData")).email
    }
    let result = await $.post("http://localhost:7777/media/getMyVideos", obj);
    console.log("result",result.data)

    let videosData = result.data;

    return videosData ? videosData : [];
}

async function getVideo(video){
    return `
        <li>
        <a href="../${video.postVideo}" title="" data-strip-group="mygroup" class="strip" data-strip-options="width: 700,height: 450,youtube: { autoplay: 1 }"><img src="images/resources/photo1.jpg" alt="">
            <i>
                <svg version="1.1" class="play" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" height="40px" width="40px"
                viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
            <path class="stroke-solid" fill="none" stroke=""  d="M49.9,2.5C23.6,2.8,2.1,24.4,2.5,50.4C2.9,76.5,24.7,98,50.3,97.5c26.4-0.6,47.4-21.8,47.2-47.7
                C97.3,23.7,75.7,2.3,49.9,2.5"/>
            <path class="icon" fill="" d="M38,69c-1,0.5-1.8,0-1.8-1.1V32.1c0-1.1,0.8-1.6,1.8-1.1l34,18c1,0.5,1,1.4,0,1.9L38,69z"/>
                </svg>
            </i>
        </a>
    </li>`
}

renderMyVideos();