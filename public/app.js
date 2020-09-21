function storeTask(){
    console.log('Stores the task');
    let taskDescription = document.getElementById('task_description').value;
    console.log('task description:',taskDescription);

    let payload = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: taskDescription })
    };

    fetch('/tasks', payload)
        .then(response => {
          if(response.ok) {
            return response.json();
          } else {
            throw "Error en la llamada Ajax";
          }
        })
        .then(task => {
          document.getElementById('task_description').value = '';
          addTask(task);
        })
        .catch(error => {
          console.log('Error: ', error);
        });
    
}

function addTask(task) {
    let html =
    `
    <div class="card my-3">
      <div class="card-body">
        <p class="card-text">${task.description}</p>
        <form method="POST" action="/tasks/update/${task.id}">
          <input class="btn btn-outline-success btn-sm form-group" type="submit" value="Done">
        </form>
        <form method="POST" action="/tasks/delete/${task.id}">
          <input class="btn btn-outline-danger btn-sm form-group" type="submit" value="Delete">
        </form>
      </div>
    </div>
    `;
    let node = document.createRange().createContextualFragment(html);
    document.getElementById('task_list').prepend(node);
}

function updateStatusDone(id){

  let payload = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: id })
  };

    
  fetch(`/tasks/${id}`, payload)
            .then(response => {
              if(response.ok) {
                return response.json();
              } else {
                throw "Error en la llamada AJAX";
              }
            }).then(task => {

              done(task);
            }).catch(error => {
              console.log('Error: ', error);
            });
  


}

function done(task){
    let html =  `<div class="card my-3" id="taskCard-${task.id}"> <div class="card-body">
    <p class="card-text">${task.description}</p>
    <form method="POST" action="/tasks/update/${task.id}">
    <a href="javascript:;" class="card-link" onclick="updateStatusDone(${task.id});">Done</a>
  </form>
  </div>
  </div>`;

    let node = document.createRange().createContextualFragment(html);
    document.getElementById('task_list').prepend(node);
}

function deleteTask (id) {

  let payload = {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: id })
  };

  fetch(`/tasks/delete/${id}`, payload)
    .then(response => {
      if(response.ok) {
        return response.json();
      } else {
        throw "Error en la llamada AJAX";
      }
    }).then(task => {

      done(task);
    }).catch(error => {
      console.log('Error: ', error);
    });
}

function deleteH(task){
  let html =  `<div class="card my-3" id="taskCard-${task.id}"> <div class="card-body">
    <p class="card-text">${task.description}</p>
    <form method="POST" action="/tasks/update/${task.id}">
    <a href="javascript:;" class="card-link" onclick="updateStatusDone(${task.id});">e</a>
  </form>
  </div>
  </div>`;

    let node = document.createRange().createContextualFragment(html);
    document.getElementById('task_list').remove(node);

}





