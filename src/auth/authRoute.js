const authRouter = require('express').Router();
const { adminAuth, userAuth } = require('./authContoller');

authRouter.get('/adminAuth',adminAuth);
authRouter.get('/userAuth',userAuth);

module.exports = authRouter;