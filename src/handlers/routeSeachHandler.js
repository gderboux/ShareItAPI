const Handlers = {};
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyBm0nssWB8dQ84HZicYuBw_HCxONuG8F6A'
});

Handlers.searchRoute = function (request, reply) {
     googleMapsClient.directions({
         origin: request.payload.origin,
         destination: request.payload.destination,
         waypoints: request.payload.waypoints,
         language: "fr",
         units: "metric"
    }, function(err, response) {
        if (!err) {
            return reply({
                statusCode: 200,
                message: 'Successfully searched',
                data: response
            });
        }
    });
};
module.exports = {
    handlers: Handlers
};