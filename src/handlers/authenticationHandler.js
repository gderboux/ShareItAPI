const UserModel = require('../models/user');
const Handlers = {};

Handlers.login = function (request, reply) {
    UserModel.find({_id: '5848236870ccba6d105ac90a'}, function (error, data) {
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
                request.auth.session.set(data);

                reply({
                    statusCode: 200,
                    message: 'User Data Successfully Fetched',
                    data: data
                });
            }
        }
    })
};

Handlers.logout = function(request, reply) {

    request.auth.session.clear();
    return reply('Logout Successful!');

};

module.exports = {
    handlers: Handlers
};