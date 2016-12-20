const mongoose = require('mongoose');
const Joi = require('joi');
var Joigoose = require('joigoose')(mongoose);
const joiAddressSchema = require('./address');
const joiCarSchema = require('./car');

var joiUserSchema = Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    pseudo: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    gender: Joi.string().allow('HOMME', 'FEMME').required(),
    birthDate: Joi.date().required(),
    isDriver: Joi.boolean().required(),
    car: joiCarSchema,
    address: joiAddressSchema.required()
});

var mongooseUserSchema = Joigoose.convert(joiUserSchema);
var User = mongoose.model('Users', mongooseUserSchema);

module.exports = {
    joiSchema: joiUserSchema,
    mongooseModel: User,
};