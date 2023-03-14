userData = JSON.parse(localStorage.getItem("userData"));
async function renderCreatePostbox(){
    try{
        if(userData ==  null || userData?.email == null){
            console.log("post box rendering failed...");
            return;
        }
        $("#new-postbox").html(`<figure>
                                <img src="${userData.profilePic}" onerror="this.onerror=null; this.src='../static/images/resources/defaultUser.png'" alt="Default Image">
                                </figure>
                                <div class="newpst-input">
                                    <form enctype="multipart/form-data" method="POST" name="newPost" id="newPost">
                                        <textarea rows="2" placeholder="write something" name="text" id="text"></textarea>
                                        <div class="attachments">
                                            <ul>
                                                <li>
                                                    <i class="fa fa-microphone" id="voice"></i>
                                                </li>
                                                <li>
                                                    <i class="fa fa-image"></i>
                                                    <label class="fileContainer">
                                                        <input type="file" name="image" id="image">
                                                    </label>
                                                </li>
                                                <li>
                                                    <i class="fa fa-video-camera"></i>
                                                    <label class="fileContainer">
                                                        <input type="file" name="video" id="video">
                                                    </label>
                                                </li>
                                                <!-- <li>
                                                    <i class="fa fa-camera"></i>
                                                    <label class="fileContainer">
                                                        <input type="file">
                                                    </label>
                                                </li> -->
                                                <li>
                                                    <div class="btn btn-primary" name="generateContent" id="generateContent">Generate Content</div>
                                                </li>
                                                <li>
                                                    <button type="submit" name="addPost" id="addPost">Post</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </form>
                                </div>`)
    }
    catch(e){
        console.log("post box rendering failed...");
    }
}
renderCreatePostbox()