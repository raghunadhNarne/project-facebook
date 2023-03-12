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
//             let result = await $.ajax({method:"POST",data:JSON.stringify(postData), url:backendHost+"/post/textPost"});
//             alert(result + "successfully posted");
//         }
//         catch(e){
//             alert("failed to post: " + e);
//         }
//     }

//     else if(formData.get("image") == null){
//         formData.set("postType","video")
//         try{
//             let result = await $.ajax({method:"POST", data:formData, processData: false, contentType: false, 'url':backendHost+"/post/filePost"})
//             alert(result+'successfully posted');
//         }
//         catch(e){
//             console.log("error in createNewPost",e);
//         }
//     }

//     else{
//         formData.set("postType","image")
//         try{
//             let result = await $.ajax({method:"POST", "data":formData, processData: false, contentType: false, 'url':backendHost+"/post/filePost"})
//             alert(result+'successfully posted');
//         }
//         catch(e){
//             console.log("error in createNewPost",e);
//         }
//     }
// }




// $('#addPost').on("click",createNewPost);


let groupName = window.location.hash;
let link = window.location.href

$('#newPost').on('submit', async function(event) {
    event.preventDefault(); // prevent the form from submitting normally



    Swal.fire({
        showCancelButton: true,
        confirmButtonText: 'Post',
        icon:"warning",
        title:"Are your sure?",
        showLoaderOnConfirm: true,
        allowOutsideClick: false,
        preConfirm:  async() => {
            let formData = new FormData(document.querySelector("#newPost"));
            let userData = localStorage.getItem('userData');
            userData = JSON.parse(userData)
            // console.log("hi",userData)

            formData.set("userEmail",userData.email) //user data comes from local sorage
            formData.set("userName",userData.firstName + " " + userData.lastName)
            formData.set("userPic",userData.profilePic);
            // console.log("form data: ",formData.get("image").name == "");
            if(groupName.length==0 || !link.includes("groupIndex.html")){
                formData.set("groupName","");
            }
            else{
                formData.set("groupName",groupName.substring(1));
            }



            //sanitize post text
            try{
                obj = {
                    postText : formData.get("text")
                }
                // console.log("text",obj);
                let result = await $.post(backendHost+"/xssScriptingFix/sanitizeDOM", obj);

                let cleanedDOM = result.cleanedDOM;
                let removedDOM = result.removedDOM;

                //change the content of text in form data
                formData.set("text",cleanedDOM.toString());
                console.log("after sanitizing: ",cleanedDOM);
                // alert(`sorry bro these data from your text is removed: ${JSON.stringify(removedDOM)}`)
                Swal.fire({
                    icon: 'success',
                    title: "successfully sanitized post",
                    
                    showConfirmButton: false, 
                    allowOutsideClick: false, 
                    timer:2000
                    
                  });
            }
            catch(e){
                Swal.fire({
                    icon: 'error',
                    title: "sanitizing post text failed: " + e,
                    showConfirmButton: false, 
                    allowOutsideClick: false, 
                    timer:2000
                  });
            }





            if(formData.get("image").name == "" && formData.get("video").name == ""){
                if(formData.get("text") == ""){
                    setTimeout(()=>{
                        Swal.fire({
                            icon: 'error',
                            title: "post is empty !!",
                            showConfirmButton: false, 
                            allowOutsideClick: false, 
                            timer: 2500
                          });
                    },2000)
                    return;
                }
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
                    let result = await $.ajax({"method":"POST",data:postData, "url":backendHost+"/post/textPost"});

                    setTimeout(()=>{
                        Swal.fire({
                            icon: 'success',
                            title: result.message,
                            
                            showConfirmButton: false, 
                            allowOutsideClick: false, 
                            timer:  2500
                          });
                        $("#text").text("")
                    },2000)
                    
                }
                catch(e){
                    setTimeout(()=>{
                        Swal.fire({
                            icon: 'error',
                            title: "failed to post: " + e,
                            showConfirmButton: false, 
                            allowOutsideClick: false, 
                            timer:  2500
                          });
                    },2000)
                }
            }

            else if(formData.get("image").name == ""){
                formData.set("postType","video")
                formData.set("image",formData.get("video"))
                formData.set("video",null)
                try{
                    let result = await $.ajax({method:"POST", data:formData, processData: false, contentType: false, 'url':backendHost+"/post/filePost"})
                    setTimeout(()=>{
                        Swal.fire({
                            icon: 'success',
                            title: result.message,
                            
                            showConfirmButton: false, 
                            allowOutsideClick: false, 
                            timer:  2500
                          });
                    },2000)
                }
                catch(e){
                    setTimeout(()=>{
                        Swal.fire({
                            icon: 'error',
                            title: "failed to post: " + e,
                            showConfirmButton: false, 
                            allowOutsideClick: false, 
                            timer:  2500
                          });
                    },2000)
                }
            }

            else{
                formData.set("postType","image")
                try{
                    let result = await $.ajax({method:"POST", "data":formData, processData: false, contentType: false, 'url':backendHost+"/post/filePost"})
                    setTimeout(()=>{
                        Swal.fire({
                            icon: 'success',
                            title: result.message,
                            
                            showConfirmButton: false, 
                            allowOutsideClick: false, 
                            timer:  2500
                          });
                    },2000)
                }
                catch(e){
                    setTimeout(()=>{
                        Swal.fire({
                            icon: 'error',
                            title: "failed to post: " + e,
                            showConfirmButton: false, 
                            allowOutsideClick: false, 
                            timer:  2500
                          });
                    },2000)
                }
            }
        },});
});







let firstmsg ="";
async function autoGenerateContent(){
    let msg = $("#text").val();
    if(firstmsg == "") firstmsg = msg
    let data = {
        text : `i am posting on social media, generate me impressive content for: "${firstmsg}". and also add some hashtags. give the response in html format with beautiful stylings to appropriate text `
    }
    let result = await $.ajax({method:"POST", "data":data, 'url':backendHost+"/post/autoGenerateContent"});
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