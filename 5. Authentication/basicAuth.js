var express = require('express'),
    basicAuth = require('basic-auth');

var app = express();

var auth = function (req, res, next) {
    function unauthorized(res) {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        return res.send(401);
    };

    var user = basicAuth(req);

    if (!user || !user.name || !user.pass) {
        return unauthorized(res);
    };

    if (user.name ===  user.pass) {
        return next();
    } else {
        return unauthorized(res);
    };
};

app.get('/', auth, function (req, res) {
    res.send('Access authorized section');
});

app.listen(3000);
