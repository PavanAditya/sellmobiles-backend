const express = require('express');
const router = express.Router();
const chatControllers = require('../controllers/chat.controllers');

// ! Check the session of the User
//  http://localhost:3000/api/v1/chat/usersessioncheck
router.post('/usersessioncheck', chatControllers.userSessionCheckRouteHandler);

// ! Get all the messages of a particular conversation
//  http://localhost:3000/api/v1/chat/getmessages
router.post('/getmessages', chatControllers.getMessagesRouteHandler);

const chatRoute = router;
module.exports = {
    chatRoute: chatRoute
};