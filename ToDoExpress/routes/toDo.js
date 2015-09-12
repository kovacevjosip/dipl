var todo = require('./../toDo.js');

var checkStatus = function (req) {
    if (req.body.status) {
        req.body.status = 'Done';
    } else {
        req.body.status = 'Doing';
    }
};

exports.index = function (req, res) {
    res.render('toDo/index', {
        toDos: todo.listTask(),
        title: 'ToDo List'
    });
};

exports.createToDo = function (req, res) {
    checkStatus(req);
    todo.addTask({
        name: req.body.name,
        status: req.body.status
    });

    res.redirect('/toDo');
};

exports.details = function (req, res) {
    var item = todo.getTaskById(req.params.id);

    res.render('toDo/details', {
        item: item,
        title: 'Task details'
    });
};

exports.editToDo = function (req, res) {
    checkStatus(req);
    todo.updateTask({
        id: req.params.id,
        name: req.body.name,
        status: req.body.status
    });

    res.redirect('/toDo');
};


exports.edit = function (req, res) {
    var item = todo.getTaskById(req.params.id),
        cloneItem = JSON.parse(JSON.stringify(item));

    if (item.status === 'Done') {
        cloneItem.status = 'checked';
    } else {
        cloneItem.status = '';
    }
    console.log(cloneItem.status);
    res.render('toDo/edit', {
        item: cloneItem,
        title: 'Update task'
    });
};

exports.delete = function (req, res) {
    todo.deleteTask(req.params.id);
    res.redirect('/toDo');
};

exports.loadTasks = function (req, res) {
    todo.loadTasks();
    res.redirect('/toDo');
};

exports.deleteTasks = function (req, res) {
    todo.deleteTasks();
    res.redirect('/toDo');
};