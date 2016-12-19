const Joi = require('joi');


var joiCarSchema = Joi.object().keys({
    vin: Joi.string().required(),
    description: Joi.string().required(),
    SeatNumber: Joi.number().required(),
    color: Joi.string().required(),
    brand: Joi.string().required()
});

module.exports = joiCarSchema;