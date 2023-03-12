async function renderMyPhotos(){
    let myPhotos = await getMyPhotos();

    $("#photos").html("")
    for(let photo of myPhotos){
        $("#photos").append(
            await getPhoto(photo)
        )
    }
}



async function getMyPhotos(){
    obj = {
        email: JSON.parse(localStorage.getItem("userData")).email
    }
    let result = await $.post("http://localhost:7777/media/getMyPhotos", obj);
    // console.log("result",result.data)

    let photosData = result.data;

    return photosData ? photosData : [];
}

async function getPhoto(photo){
    return `
        <li>
            <a class="strip" href="../${photo.postImage}" title="" data-strip-group="mygroup" data-strip-group-options="loop: false">
            <img src="../${photo.postImage}" onerror="this.onerror=null; this.src='../static/images/resources/defaultPost.png'" alt="Default Image"></a>
        </li>`
}

renderMyPhotos();