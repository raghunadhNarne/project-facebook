const postRouter = require('express').Router();
const { createNewFilePost, createNewTextPost, autoGenerateContent,getTotalLikesAndPosts } = require('../controllers/postController');
const { upload } = require('../multer/multerConfig');


// postRouter.post('/createPost',createNewPost);
postRouter.post('/textPost',createNewTextPost);
postRouter.post('/filePost',upload.single("image"),createNewFilePost);
postRouter.post('/autoGenerateContent',autoGenerateContent)
module.exports = postRouter;