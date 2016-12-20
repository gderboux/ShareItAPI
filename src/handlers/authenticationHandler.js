const UserModel = require('../models/user').mongooseModel;
const Handlers = {};

Handlers.login = function (request, reply) {
    UserModel.find({email: request.payload.email, password: request.payload.password}, function (error, data) {

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
                message: 'User Not Found',
                data: data
            });
        }
        request.auth.session.set(data);
        return reply({
            statusCode: 200,
            message: 'User Data Successfully Fetched',
            data: data
        });
    })
};

Handlers.logout = function (request, reply) {
    request.auth.session.clear();
    return reply('Logout Successful!');
};

module.exports = {
    handlers: Handlers
};