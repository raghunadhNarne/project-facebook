let signupRouter = require('express').Router();
const { signup } = require('../controllers/signupController');

signupRouter.post('/',signup);

module.exports = signupRouter;