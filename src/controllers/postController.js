const { addNewTextPost, addNewFilePost } = require("../utils/Postutils");

// async function createNewPost(req,res){
//     let postData = req.body;
//     let result = {};
   
//     if(postData.postType == "text"){
//         // result = await addNewTextPost(postData.userEmail,postData)
//         res.redirect('textPost');
//         return;
//     }

//     else{
//         // result = await addNewFilePost(postData.userEmail,postData);
//         res.redirect('filePost');
//         return;
//     }
    
// }


async function createNewTextPost(req,res){
    let postData = req.body;
    let userData = res.locals.user;
    let result = {};
    // console.log(postData);
    result = await addNewTextPost(postData.userEmail,postData,userData);

    res.send(result);
}


async function createNewFilePost(req,res){
    // console.log(req.file);
    let postData = req.body;
    let userData = res.locals.user;
    let multerFileName = req.file.path;
    let result = {};
    result = await addNewFilePost(postData.userEmail,postData,userData,multerFileName);

    res.send(result);
}

module.exports = {createNewFilePost, createNewTextPost}