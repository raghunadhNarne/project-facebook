const loginRouter = require('express').Router();
const { validateUser } = require('../controllers/loginController');

loginRouter.post('/',validateUser);

module.exports = loginRouter;