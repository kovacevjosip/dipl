var express = require('express'),
    cookieParser = require('cookie-parser');

var app = express();

app.set('view engine', 'jade');
app.use(cookieParser());

app.get('/', function (req, res) {
    if (req.cookies.beenHereBefore === 'yes') {
        res.send('You have been here before');
    } else {
        res.cookie('beenHereBefore', 'yes');
        res.send('First time visiting page');
    }
});

app.get('/clear', function (req, res) {
    res.clearCookie('beenHereBefore');
    res.redirect('/');
});

app.listen(3000);