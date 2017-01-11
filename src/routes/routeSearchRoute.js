const API_BASE_PATH = '/searchRoute';
const Handlers = require('../handlers/routeSeachHandler');
const Joi = require('joi');
const routes = [];

routes.push({
    method: 'POST',
    path: API_BASE_PATH,
    config: {
        tags: ['api'],
        description: 'Get Direction',
        notes: 'Get Route between two address with one or more waypoints' ,
        validate: {
            payload: {
                origin: Joi.string().required(),
                destination: Joi.string().required(),
                waypoints: Joi.array().items(Joi.string())
            }
        }
    },
    handler: Handlers.handlers.searchRoute
});

module.exports = routes;

