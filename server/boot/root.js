'use strict';

const _ = require('lodash')
module.exports = function (server) {
    var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

    // Install a `/` route that returns server status
    var router = server.loopback.Router();
    router.get('/status', server.loopback.status());
    // console.log("Config" + JSON.stringify(config))
    router.get('/', ensureLoggedIn('/auth/google'), function (req, res, next) {
        res.render('index', {

            configJSONString: JSON.stringify({ displayName: req.user.profiles[0].__data.profile.displayName }),

            build: { cacheBustValue: "25", NODE_ENV: process.env.NODE_ENV }
        })

    })
    server.use(router);
};
