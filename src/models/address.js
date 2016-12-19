const Joi = require('joi');

var joiAddressSchema = Joi.object().keys({
    street: Joi.string().required(),
    streetNumber: Joi.string().required(),
    postalCode: Joi.string().required(),
    country: Joi.string().required()
});


module.exports = joiAddressSchema;