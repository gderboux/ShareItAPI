const Joi = require('joi');

var joiCarSchema = Joi.object().keys({
    vin: Joi.string(),
    description: Joi.string(),
    SeatNumber: Joi.number(),
    color: Joi.string(),
    brand: Joi.string()
});

module.exports = joiCarSchema;