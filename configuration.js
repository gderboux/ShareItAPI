module.exports = {
    server: {
        port: 3000,
        host: "localhost"
    },
    mongodb: {
        db: "ShareIt",
        host: "localhost"
    },
    auth: {
        secret: "cookiePassword",
        ttl: 24 * 60 * 60 * 1000
    }
};