const postRouter = require('express').Router();
const { createNewFilePost, createNewTextPost } = require('../controllers/postController');
const { upload } = require('../multer/multerConfig');


// postRouter.post('/createPost',createNewPost);
postRouter.post('/textPost',createNewTextPost);
postRouter.post('/filePost',upload.single("image"),createNewFilePost);

module.exports = postRouter;