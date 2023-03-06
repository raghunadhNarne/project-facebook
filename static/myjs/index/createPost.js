// async function createNewPost(){
//     let formData=new FormData(document.querySelector("#newPost"));
//     console.log("hi",formData)
//     let userData = localStorage.getItem('userData');
//     formData.set("useremail",userData.email) //user data comes from local sorage
//     formData.set("userName",userData.firstName + " " + userData.lastName)
//     formData.set("userPic",userData.profilePic);
//     console.log("form data: ",formData);

//     if(formData.get("image") == null && formData.get("video") == null){
//         formData.set("postType","text")
//         let postData = {};
//         for(let [key, val] of formData.entries()) {
//             console.log(key, val);
//             postData[key] = val;
//         }
//         console.log("text: ",formData)
//         try{
//             let result = await $.ajax({method:"POST",data:JSON.stringify(postData), url:"http://127.0.0.1:7777/post/textPost"});
//             alert(result + "successfully posted");
//         }
//         catch(e){
//             alert("failed to post: " + e);
//         }
//     }

//     else if(formData.get("image") == null){
//         formData.set("postType","video")
//         try{
//             let result = await $.ajax({method:"POST", data:formData, processData: false, contentType: false, 'url':"http://127.0.0.1:7777/post/filePost"})
//             alert(result+'successfully posted');
//         }
//         catch(e){
//             console.log("error in createNewPost",e);
//         }
//     }

//     else{
//         formData.set("postType","image")
//         try{
//             let result = await $.ajax({method:"POST", "data":formData, processData: false, contentType: false, 'url':"http://127.0.0.1:7777/post/filePost"})
//             alert(result+'successfully posted');
//         }
//         catch(e){
//             console.log("error in createNewPost",e);
//         }
//     }
// }




// $('#addPost').on("click",createNewPost);




$('#newPost').on('submit', async function(event) {
    event.preventDefault(); // prevent the form from submitting normally
    let formData = new FormData(document.querySelector("#newPost"));
    let userData = localStorage.getItem('userData');
    userData = JSON.parse(userData)
    // console.log("hi",userData)

    formData.set("userEmail",userData.email) //user data comes from local sorage
    formData.set("userName",userData.firstName + " " + userData.lastName)
    formData.set("userPic",userData.profilePic);
    // console.log("form data: ",formData.get("image").name == "");


    if(formData.get("image").name == "" && formData.get("video").name == ""){
        formData.set("postType","text")
        let postData = {};
        for(let [key, val] of formData.entries()) {
            // console.log(key, val);
            postData[key] = val;
        }
        postData.image = null;
        postData.video = null;
        console.log(postData)
        try{
            // console.log("hi")
            let result = await $.ajax({"method":"POST",data:postData, "url":"http://localhost:7777/post/textPost"});
            alert(result.message);
        }
        catch(e){
            alert("failed to post: " + e);
        }
    }

    else if(formData.get("image").name == ""){
        formData.set("postType","video")
        formData.set("image",formData.get("video"))
        formData.set("video",null)
        // console.log("vid",formData.get("video"));
        // console.log("img",formData.get("image"))
        try{
            let result = await $.ajax({method:"POST", data:formData, processData: false, contentType: false, 'url':"http://127.0.0.1:7777/post/filePost"})
            alert(result.message);
        }
        catch(e){
            console.log("error in createNewPost",e);
        }
    }

    else{
        formData.set("postType","image")
        try{
            let result = await $.ajax({method:"POST", "data":formData, processData: false, contentType: false, 'url':"http://127.0.0.1:7777/post/filePost"})
            alert(result.message);
        }
        catch(e){
            console.log("error in createNewPost",e);
        }
    }
});