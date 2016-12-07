const UserModel = require('../models/user');
const Handlers = {};

Handlers.getAll = function (request, reply) {
    UserModel.find({}, function (error, data) {
        if (error) {
            reply({
                statusCode: 503,
                message: 'Failed to get data',
                data: error
            });
        } else {
            reply({
                statusCode: 200,
                message: 'User Data Successfully Fetched',
                data: data
            });
        }
    });
};

Handlers.getOne = function (request, reply) {
    UserModel.find({_id: request.params.id}, function (error, data) {
        if (error) {
            reply({
                statusCode: 503,
                message: 'Failed to get data',
                data: error
            });
        } else {
            if (data.length === 0) {
                reply({
                    statusCode: 200,
                    message: 'User Not Found',
                    data: data
                });
            } else {
                reply({
                    statusCode: 200,
                    message: 'User Data Successfully Fetched',
                    data: data
                });
            }
        }
    });
};

Handlers.put = function (request, reply) {
    UserModel.findOneAndUpdate({_id: request.params.id}, request.payload, function (error, data) {
        if (error) {
            reply({
                statusCode: 503,
                message: 'Failed to get data',
                data: error
            });
        } else {
            reply({
                statusCode: 200,
                message: 'User Updated Successfully',
                data: data
            });
        }
    });

};

Handlers.post = function (request, reply) {
    var user = new UserModel(request.payload);
    user.save(function (error) {
        if (error) {
            reply({
                statusCode: 503,
                message: error
            });
        } else {
            reply({
                statusCode: 201,
                message: 'User Saved Successfully'
            });
        }
    });
};

Handlers.delete = function (request, reply) {
    UserModel.findOneAndRemove({_id: request.params.id}, function (error) {
        if (error) {
            reply({
                statusCode: 503,
                message: 'Error in removing User',
                data: error
            });
        } else {
            reply({
                statusCode: 200,
                message: 'User Deleted Successfully'
            });
        }
    });

};

module.exports = {
    handlers: Handlers
};