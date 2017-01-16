const mongoose = require('mongoose');
const Joi = require('joi');
var Joigoose = require('joigoose')(mongoose);
const joiAddressSchema = require('./address');

var joiBookingSchema = Joi.object().keys({
    driverId: Joi.string().meta({ type: 'ObjectId', ref: 'Users' }).required(),
    passengersRoute: Joi.array().items(Joi.object().keys({
        passengerId: Joi.string().meta({ type: 'ObjectId', ref: 'Users' }).required(),
        origin: joiAddressSchema.required(),
        destination: joiAddressSchema.required(),
        originDate: Joi.date().iso().required(),
        destinationDate: Joi.date().iso().required(),
        cost: Joi.number().required(),
        kilometer: Joi.number().required()
        })),
    originDate: Joi.date().iso().required(),
    destinationDate: Joi.date().iso().required(),
    origin: joiAddressSchema.required(),
    destination: joiAddressSchema.required(),
    duration: Joi.number().required(),
    cost: Joi.number().required()
});

var mongooseBookingSchema = Joigoose.convert(joiBookingSchema);
var Booking = mongoose.model('Bookings', mongooseBookingSchema);

module.exports = {
    joiSchema: joiBookingSchema,
    mongooseModel: Booking,

};
