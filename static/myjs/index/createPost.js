async function createNewPost(){
    let formData=new FormData(document.querySelector("#newPost"));
    formData.set("")

    formData.set("useremail","abc@gmail.com") //user data comes from middle ware


    if(formData.get("image") == null && formData.get("video") == null){
        let postData = {};
        for(let [key, val] of formData.entries()) {
            console.log(key, val);
            postData[key] = val;
        }
        try{
            let result = await $.ajax({method:"POST","data":JSON.stringify(postData), "url":"/post/textPost"});
            alert(result + "successfully posted");
        }
        catch(e){
            alert("failed to post: " + e);
        }
    }

    else if(formData.get("image") == null){
        try{
            formData.get()
            let result = await $.ajax({method:"POST", "data":formData, processData: false, contentType: false, 'url':"/post/filePost"})
            alert(result+'successfully posted');
        }
        catch(e){
            console.log("error in createNewPost",e);
        }
    }

    else{

    }

    try{
        let result = await $.ajax({method:"POST", 'data':formData, processData: false, contentType: false, 'url':"/post/newPost"})
        alert(result+'successfully posted');
    }
    catch(e){
        console.log("error in createNewPost",e);
    }
}




$('#addPost').on('submit',createNewPost);