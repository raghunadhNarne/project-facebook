const chatRoute = require('express').Router();
const { fetchchating,putmessage } = require('../controllers/chatController');



chatRoute.post("/fetchchating",fetchchating);
chatRoute.post("/putmessage",putmessage);

module.exports = chatRoute;