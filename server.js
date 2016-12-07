const Hapi = require('hapi');
const mongoose = require('mongoose');
const Fs = require('fs');
const _ = require('lodash');
const Pack        = require('./package.json');

mongoose.connect('mongodb://localhost/ShareIt');

const server = new Hapi.Server();
server.connection({port: 8080});

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
        password: 'cookiePassword',
        cookie: 'app-cookie',
        isSecure: false,
        ttl: 24 * 60 * 60 * 1000
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
