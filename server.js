const Hapi = require('hapi');
const mongoose = require('mongoose');
const Fs = require('fs');
const _ = require('lodash');
const Pack = require('./package.json');
const config = require("./configuration");

mongoose.connect('mongodb://' + config.mongodb.host + '/' + config.mongodb.db);

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

    server.auth.default({
        strategy: 'base'
});

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
