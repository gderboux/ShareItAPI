const Hapi = require('hapi');
const mongoose = require('mongoose');
const Fs = require('fs');
const _ = require('lodash');
const Pack = require('./package.json');
const config = require("./configuration");
const mongoUrl = 'mongodb://' + config.mongodb.host + '/' + config.mongodb.db;

mongoose.connect(mongoUrl, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log('Mongodb : Connected to ' + mongoUrl);

    Fs.readdirSync('./DevData').forEach((file) => {
        file = file.substring(0, file.indexOf('.'));
        console.log('Mongodb: initialisation des data ' + file);
        var mongooseModel = mongoose.model(file);
        mongooseModel.remove(function(err) {
            if (err) {
                console.log(err);
            }
        });
         var data = require('./DevData/' + file + ".json");
         for (var i = 0; i < data.length; i++) {
         new mongooseModel(data[i]).save( (err) => {
             if (err) {
                 console.log(err);
             }
            });
         }
    });
    console.log('Mongodb : Data initialized')
});


const server = new Hapi.Server();
server.connection({port: config.server.port});

server.register([{
    register: require('hapi-swagger'),
    options: {
        info: {
            title: Pack.name,
            description: Pack.description,
            version: Pack.version,
        },
        securityDefinitions: {
            jwt: {
                type: 'apiKey',
                name: 'Authorization',
                in: 'header'
            }
        },
        documentationPath: '/'
    }
},
    {
        register: require('hapi-auth-cookie')
    }
], function (err) {
    if (err) {
        throw err;
    }

    server.auth.strategy('standard', 'cookie', {
        password: config.auth.secret,
        cookie: 'app-cookie',
        isSecure: false,
        ttl: config.auth.ttl
    });

    /*server.auth.default({
        strategy: 'standard'
    });*/

    // require routes
    Fs.readdirSync('./src/routes').forEach((file) => {

        _.each(require('./src/routes/' + file), (routes) => {
            server.route(routes);
        });
    });

    server.start((err) => {

        if (err) {
            console.log(err);
        }

        console.log('Server running at:', server.info.uri);
    });
});

//LOG REQUEST
server.on('response', function (request) {
    console.log(request.info.remoteAddress + ': ' + request.method.toUpperCase() + ' ' + request.url.path + ' --> ' + request.response.statusCode);
});

