const authRouter = require('express').Router();
const { checkLogin, authAdmin, authParent } = require('../controllers/authcontroller');


authRouter.post('/login',checkLogin);
authRouter.post('/parent',authParent)
authRouter.post('/admin',authAdmin)

module.exports = authRouter;