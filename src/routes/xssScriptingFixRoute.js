const xssScriptingFixRouter = require('express').Router();
const { sanitizeDOM } = require('../controllers/xssScriptingFixController');


xssScriptingFixRouter.post('/sanitizeDOM',sanitizeDOM);

module.exports = xssScriptingFixRouter;