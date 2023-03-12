const {Configuration, OpenAIApi} = require('openai');
const config = new Configuration({
  apiKey: process.env.OPEN_API_SECRET_KEY
});

const openai = new OpenAIApi(config);
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
    let result = {};
    // console.log("hi",postData);
    result = await addNewTextPost(postData.userEmail,postData);

    res.send(result);
}


async function createNewFilePost(req,res){
    // console.log(req.file);
    let postData = req.body;
    let multerFileName = req.file.location;
    let result = {};
    result = await addNewFilePost(postData.userEmail,postData,multerFileName);

    res.send(result);
}


function autoGenerateContent(req, res){
    // console.log(req.body)
    const response = openai.createCompletion({
        model: 'text-davinci-003',
        prompt: req.body.text,
        temperature: 0.9,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 550
    });
  
    response.then((data) => {
        const message = {message: data.data.choices[0].text};
       
        res.send(message);

    }).catch((err) => {
        // console.log(err)
        res.send(err);
    });
  }

module.exports = {createNewFilePost, createNewTextPost, autoGenerateContent}