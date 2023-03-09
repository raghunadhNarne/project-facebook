let userRouter = require('express').Router();
const userController = require('../controllers/userController');
const { upload } = require('../multer/multerConfig')

userRouter.get('/getallpendingusers',userController.getAllPendingUsers)
userRouter.post('/deletependingrequest',userController.justDeletePendingRequest)
userRouter.post('/acceptpendingrequest',userController.justAcceptPendingRequest)
userRouter.post('/addchild',userController.justAddChild)
userRouter.post('/updateuser',upload.fields([{name:"profile",maxCount:1},{name:"cover",maxCount:1}]),userController.justUpdateUser)
userRouter.post('/getsingleuser',userController.justGetSingleUser)
userRouter.post('/changepassword',userController.justChangePassword)

module.exports = userRouter;