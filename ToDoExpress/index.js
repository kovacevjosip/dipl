var express = require('express'),
    path = require('path'),
    todo = require('./routes/toDo.js'),
    bodyParser = require('body-parser');

var app = express();

var isTaskSet = function (req, res, next) {
    if (req.body.name) {
        next();
    } else {
        res.send('The task name is not set!<br>' +
                 '<a href="/toDo">Go back</a>');
    }
};
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/toDo', todo.index);
app.post('/toDo', todo.createToDo);
app.post('/toDo/create', isTaskSet, todo.createToDo);
app.get('/toDo/details/:id', todo.details);
app.get('/toDo/edit/:id', todo.edit);
app.post('/toDo/edit/:id', todo.editToDo);
app.get('/toDo/delete/:id', todo.delete);

// force huge numbers of tasks
app.get('/toDo/loadTasks', todo.loadTasks);
app.get('/toDo/deleteTasks', todo.deleteTasks);

app.listen(3000);