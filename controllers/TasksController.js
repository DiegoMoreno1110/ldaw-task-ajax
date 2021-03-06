const Task = require('../models/Task');

exports.store = (req, res) => {
  let task = {};
  task.description = req.body.description;
  Task.create(task).then((id) => {
    console.log('Task created with id: ', id);

    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      Task.find(id).then((task) => res.json(task));
    } else {
      res.redirect('/');
    }

  });
}

exports.updateTaskStatus = (req, res) => {
  let id = req.params.id;

  Task.updateTaskStatus(id).then((id) => {
    console.log('Se cambió el status a done');
    if (req.xhr || req.headers.accept.indexOf("json") > -1) {
      res.json({ id: id });
    } else {
      res.redirect("/");
    }
  });

}

exports.updateTaskStatusAjax = (req, res) => {

  let id = req.body.id;

  Task.updateTaskStatus(id).then((task) => {
    console.log('Se cambio estatus a done ajax')
    if (req.xhr || req.headers.accept.indexOf("json") > -1) {
      res.json({ id: id });
    } else {
      res.redirect("/");
    }
  });

}

exports.delete = (req, res) =>{

  let id = req.params.id;

  Task.find(id).then((task) => {

    if(!task){
      return;
    }

    Task.delete(task.id).then((id) => {
      if (req.xhr || req.headers.accept.indexOf("json") > -1) {
        res.json({ id: id });
      } else {
        res.redirect("/");
      }
    });

  });

}
  


