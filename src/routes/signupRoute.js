let signupRouter = require('express').Router();
const { signup } = require('../controllers/signupController');
const { upload } = require('../multer/multerConfig')
signupRouter.post('/',upload.single("image"),signup);


module.exports = signupRouter;