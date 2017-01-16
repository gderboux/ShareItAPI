const BookingModel = require('../models/booking').mongooseModel;
const Handlers = {};

Handlers.getAll = function (request, reply) {
    BookingModel.find({}, function (error, data) {
        if (error) {
            return reply({
                statusCode: 503,
                message: 'Failed to get data',
                data: error
            });
        }
        return reply({
            statusCode: 200,
            message: 'Booking Data Successfully Fetched',
            data: data
        });
    });
};

Handlers.getOne = function (request, reply) {
    BookingModel.findOne({_id: request.params.id})
        .populate('driverId')
        .populate('passengersRoute.passengerId')
        .exec(function (error, data) {
        if (error) {
            return reply({
                statusCode: 503,
                message: 'Failed to get data',
                data: error
            });
        }
        if (data.length === 0) {
            return reply({
                statusCode: 200,
                message: 'Booking Not Found',
                data: data
            });
        }

        return reply({
            statusCode: 200,
            message: 'Booking Data Successfully Fetched',
            data: data
        });
    });
};

Handlers.put = function (request, reply) {
    BookingModel.findOneAndUpdate({_id: request.params.id}, request.payload, function (error, data) {
        if (error) {
            return reply({
                statusCode: 503,
                message: 'Failed to get data',
                data: error
            });
        }
        return reply({
            statusCode: 200,
            message: 'Booking Updated Successfully',
            data: data
        });

    });

};

Handlers.post = function (request, reply) {
    var booking = new BookingModel(request.payload);
    booking.save(function (error) {
        if (error) {
            return reply({
                statusCode: 503,
                message: error
            });
        }
        return reply({
            statusCode: 201,
            message: 'Booking Saved Successfully'
        });

    });
};

Handlers.delete = function (request, reply) {
    BookingModel.findOneAndRemove({_id: request.params.id}, function (error) {
        if (error) {
            return reply({
                statusCode: 503,
                message: 'Error in removing Booking',
                data: error
            });
        }
        return reply({
            statusCode: 200,
            message: 'Booking Deleted Successfully'
        });

    });
};

Handlers.getAllBookingForSpecificUser = function (request, reply) {
    BookingModel.find({driverId: request.params.id}, function (error) {
        if (error) {
            return reply({
                statusCode: 503,
                message: 'Failed to get Data',
                data: error
            });
        }
        return reply({
            statusCode: 200,
            message: 'Bookings Data Successfully Fetched'
        });
    });
};

module.exports = {
    handlers: Handlers
};