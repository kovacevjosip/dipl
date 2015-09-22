var express = require('express'),
    session = require('express-session');

var app = express();

app.set('view engine', 'jade');
app.use(session({
    secret: 'Secret string',
    resave: false,
    saveUninitialized: false
}));

app.get('/', function (req, res) {
    req.session.name = req.session.name || new Date().toUTCString();
    res.send(req.sessionID + '\n' + req.session.name);
});

app.listen(3000);