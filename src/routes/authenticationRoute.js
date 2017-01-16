const API_BASE_PATH = '/authentication';
const Handlers = require('../handlers/authenticationHandler');
const Joi = require('joi');
const routes = [];

routes.push({
    method: 'POST',
    path: API_BASE_PATH,
    config: {
        description: 'Login',
        notes: 'Login',
        tags: ['api'],
        auth: false,
        validate: {
            payload: {
                email: Joi.string().email().required(),
                password: Joi.string().min(2).max(200).required()
            }
        }
    },
    handler: Handlers.handlers.login

});

routes.push({
    method: 'GET',
    path: API_BASE_PATH,
    config: {
        tags: ['api'],
        description: 'Logout',
        notes: 'Logout',
        auth: {
            strategy: 'standard'
        }
    },
    handler: Handlers.handlers.logout
});

module.exports = routes;
