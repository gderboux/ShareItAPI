const API_BASE_PATH = '/users';
const userHandlers = require('../handlers/usersHandler');
const bookingHandlers = require('../handlers/bookingsHandler');

const Joi = require('joi');
const routes = [];
var joiUserSchema = require('../models/user').joiSchema;

routes.push({
    method: 'GET',
    path: API_BASE_PATH,
    config: {
        tags: ['api'],
        description: 'Get All User data',
        notes: 'Get All User data',
    },
    handler: userHandlers.handlers.getAll
});

routes.push({
    method: 'GET',
    path: API_BASE_PATH + '/{id}',
    config: {
        tags: ['api'],
        description: 'Get specific user data',
        notes: 'Get specific user data',
        validate: {
            params: {
                id: Joi.string().required()
            }
        }
    },
    handler: userHandlers.handlers.getOne
});

routes.push({
    method: 'PUT',
    path: API_BASE_PATH + '/{id}',
    config: {
        tags: ['api'],
        description: 'Update specific user data',
        notes: 'Update specific user data',
        validate: {
            params: {
                id: Joi.string().required()
            },
            payload: joiUserSchema.required()
        }
    },
    handler: userHandlers.handlers.put
});

routes.push({
    method: 'POST',
    path: API_BASE_PATH,
    config: {
        tags: ['api'],
        description: 'Save user data',
        notes: 'Save user data',
        validate: {
            payload: joiUserSchema
        }
    },
    handler: userHandlers.handlers.post
});

routes.push({
    method: 'DELETE',
    path: API_BASE_PATH + '/{id}',
    config: {
        tags: ['api'],
        description: 'Delete specific user data',
        notes: 'Delete specific user data',
        validate: {
            params: {
                id: Joi.string().required()
            }
        }
    },
    handler: userHandlers.handlers.delete
});

routes.push({
    method: 'GET',
    path: API_BASE_PATH + '/{id}/bookings',
    config: {
        tags: ['api'],
        description: 'get All booking for a specific User',
        notes: 'get All booking for a specific User',
        validate: {
            params: {
                id: Joi.string().required()
            }
        }
    },
    handler: bookingHandlers.handlers.getAllBookingForSpecificUser
});


module.exports = routes;