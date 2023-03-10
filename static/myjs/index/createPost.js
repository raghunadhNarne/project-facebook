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



    //sanitize post text
    try{
        obj = {
            postText : formData.get("text")
        }
        // console.log("text",obj);
        let result = await $.post("http://localhost:7777/xssScriptingFix/sanitizeDOM", obj);

        let cleanedDOM = result.cleanedDOM;
        let removedDOM = result.removedDOM;

        //change the content of text in form data
        formData.set("text",cleanedDOM.toString());
        console.log("after sanitizing: ",cleanedDOM);
        // alert(`sorry bro these data from your text is removed: ${JSON.stringify(removedDOM)}`)
    }
    catch(e){
        alert("sanitizing post text failed: " + e);
    }



    if(formData.get("image").name == "" && formData.get("video").name == ""){
        formData.set("postType","text")
        let postData = {};
        for(let [key, val] of formData.entries()) {
            // console.log(key, val);
            postData[key] = val;
        }
        postData.image = null;
        postData.video = null;
        // console.log(postData)
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

let firstmsg ="";
async function autoGenerateContent(){
    let msg = $("#text").val();
    if(firstmsg == "") firstmsg = msg
    // console.log(firstmsg);
    let data = {
        text : `i am posting on social media, generate me impressive content for: "${firstmsg}". and also add some hashtags. give the response in html format with beautiful stylings to appropriate text `
    }
    let result = await $.ajax({method:"POST", "data":data, 'url':"http://127.0.0.1:7777/post/autoGenerateContent"});
    console.log("result",result.message.slice(3),result.message)
    $("#text").val(result.message);
}



    $("#voice").click(()=>{
    
        const recognition = new webkitSpeechRecognition();
        recognition.interimResults = true;
    
        recognition.start();
        
    
        recognition.onresult = (event)=>{
            const transcript = event.results[0][0].transcript;
            console.log(transcript)
            $("#text").val(transcript);
        }
    })

$("#generateContent").on("click",autoGenerateContent);