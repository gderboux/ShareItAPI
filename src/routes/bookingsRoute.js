const API_BASE_PATH = '/bookings';
const Handlers = require('../handlers/bookingsHandler');
const Joi = require('joi');
const routes = [];
var joiBookingSchema = require('../models/booking').joiSchema;

routes.push({
    method: 'GET',
    path: API_BASE_PATH,
    config: {
        tags: ['api'],
        description: 'Get All booking data',
        notes: 'Get All booking data',
    },
    handler: Handlers.handlers.getAll
});


routes.push({
    method: 'GET',
    path: API_BASE_PATH + '/{id}',
    config: {
        tags: ['api'],
        description: 'Get specific booking data',
        notes: 'Get specific booking data',
        validate: {
            params: {
                id: Joi.string().required()
            }
        }
    },
    handler: Handlers.handlers.getOne
});

routes.push({
    method: 'PUT',
    path: API_BASE_PATH + '/{id}',
    config: {
        tags: ['api'],
        description: 'Update specific booking data',
        notes: 'Update specific booking data',
        validate: {
            params: {
                id: Joi.string().required()
            },
            payload: joiBookingSchema.required()
        }
    },
    handler: Handlers.handlers.put
});

routes.push({
    method: 'POST',
    path: API_BASE_PATH,
    config: {
        tags: ['api'],
        description: 'Save booking data',
        notes: 'Save booking data',
        validate: {
            payload: joiBookingSchema
        }
    },
    handler: Handlers.handlers.post
});

routes.push({
    method: 'DELETE',
    path: API_BASE_PATH + '/{id}',
    config: {
        tags: ['api'],
        description: 'Delete specific booking data',
        notes: 'Delete specific booking data',
        validate: {
            params: {
                id: Joi.string().required()
            }
        }
    },
    handler: Handlers.handlers.delete
});

module.exports = routes;