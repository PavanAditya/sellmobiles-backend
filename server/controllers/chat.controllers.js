const {
    messages
} = require('../models/message.model');
const {
    formSchema
} = require('../models/user.model');

const mongodb = require('mongodb');

const ObjectID = mongodb.ObjectID;

const routeNotFoundHandler = async (request, response) => {
    response.status(404).json({
        error: true,
        data: [],
        message: 'Path not found'
    });
};

const userSessionCheckRouteHandler = async (request, response) => {
    const userId = request.body.userId;
    if (userId === '') {
        response.status(412).json({
            error: true,
            data: [],
            message: 'User Not Found'
        });
    } else {
        try {
            // TODO: Add the socket.controllers code here
            const result = await formSchema.findOne({
                _id: ObjectID(userId),
                online: 'Y'
            });
            response.status(200).json({
                error: false,
                username: result.firstName,
                message: 'Success'
            });
        } catch (error) {
            response.status(500).json({
                error: true,
                data: [],
                message: 'Bad Request'
            });
        }
    }
};

const getMessagesRouteHandler = async (request, response) => {
    const userId = request.body.userId;
    const toUserId = request.body.toUserId;
    if (userId === '') {
        response.status(412).json({
            error: true,
            message: 'User Not found'
        });
    } else {
        const data = {
            '$or': [{
                '$and': [{
                    'toUserId': userId
                }, {
                    'fromUserId': toUserId
                }]
            }, {
                '$and': [{
                    'toUserId': toUserId
                }, {
                    'fromUserId': userId
                }]
            }, ]
        };
        try {
            const messagesResponse = await messages.find(data).sort({
                'timestamp': 1
            });
            response.status(200).json({
                status: 200,
                data: {
                    error: false,
                    messages: messagesResponse
                },
                message: 'Success'
            });
        } catch (error) {
            response.status(500).json({
                status: 500,
                data: {
                    error: true,
                messages: 'Bad Request'
                },
                message: 'Bad Request'
            });
        }
    }
};

module.exports = {
    getMessagesRouteHandler,
    userSessionCheckRouteHandler,
    routeNotFoundHandler
};