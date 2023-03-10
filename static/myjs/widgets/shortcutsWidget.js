let usersData = JSON.parse(localStorage.getItem('userData'));

async function renderShorcuts(){
    if(usersData == null) {
        console.log("Shorcuts widet rendering failed...");
        return;
    }

    $("#naves").append(
        `<li>
            <i class="ti-camera"></i>
            <a href="./liveVedio.html#${usersData.email}" title="" id="strtlive">Start Live</a>
        </li>`
    )

    $("#naves").append(
        `<li>
            <i class="ti-files"></i>
            <a href="./profile.html" title="">My profile</a>
        </li>`
    )

    $("#naves").append(
        `<li>
            <i class="ti-user"></i>
            <a href="./friendRequests.html" title="">friends</a>
        </li>`
    )

    $("#naves").append(
        ` <li>
            <i class="ti-image"></i>
            <a href="./myPhotos.html" title="">My photos</a>
        </li>`
    )

    $("#naves").append(
        `<li>
            <i class="ti-video-camera"></i>
            <a href="myVideos.html" title="">My videos</a>
        </li>`
    )

    $("#naves").append(
        `<li>
            <i class="ti-comments-smiley"></i>
            <a href="chat.html" title="">Messages</a>
        </li>`
    )

    $("#naves").append(
        `<li>
            <i class="ti-bell"></i>
            <a href="notifications.html" title="">Notifications</a>
        </li>`
    )

    $("#naves").append(
        ` <li>
            <i class="ti-power-off"></i>
            <a href="javascript:logoutUser()" title="">Logout</a>
        </li> `
    )
}
renderShorcuts();