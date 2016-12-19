
const API_BASE_PATH = '/users';
const Handlers  = require('../handlers/usersHandler');
const Joi = require('joi');
const routes = [];


var userSchema = {
    name: Joi.string(),
    surname: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string(),
    phoneNumber: Joi.string(),
    gender: Joi.string(),
    age: Joi.number()
};

routes.push({
    method: 'GET',
    path: API_BASE_PATH,
    config: {
        tags: ['api'],
        description: 'Get All User data',
        notes: 'Get All User data',
    },
    handler: Handlers.handlers.getAll
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
    handler: Handlers.handlers.getOne
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
            payload: userSchema
        }
    },
    handler: Handlers.handlers.put
});

routes.push({
    method: 'POST',
    path: API_BASE_PATH,
    config: {
        tags: ['api'],
        description: 'Save user data',
        notes: 'Save user data',
        validate: {
            payload: userSchema
        }
    },
    handler: Handlers.handlers.post
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
    handler: Handlers.handlers.delete
});


module.exports = routes;