const { fetchchating,putmessage } = require('../controllers/groupChatController');

const groupChatRoute = require('express').Router();


groupChatRoute.post("/fetchchating", fetchchating);
groupChatRoute.post("/putmessage", putmessage);



module.exports = groupChatRoute;