var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session');

var app = express();

// custom middleware for checking if user is logged
var accessChecker = function (req, res, next) {
    if (req.session.user && req.session.user.isAuthenticated) {
        next();
    } else {
        res.redirect('/login');
    }
};

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(cookieParser());
app.use(session({
    secret: 'Secret string',
    resave: false,
    saveUninitialized: false
}));
// middleware that is capable of parsing the body of the request
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/login', function (req, res) {
    res.render('login');
});

app.post('/login', function (req, res) {
    if (req.body.username === req.body.password) {
        req.session.user = {
            isAuthenticated: true,
            username: req.body.username
        };
        res.redirect('/private');
    } else {
        res.redirect('/login');
    }
});

app.get('/public', function (req, res) {
    res.send('Public access!');
});

app.get('/private', accessChecker, function (req, res) {
    res.send(`Private acces: Welcome ${req.session.user.username}!`)
});

app.listen(3000);