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
        <form action="/tasks/${task.id}/done" method="POST">
          <a href="javascript:;" onclick="parentNode.submit();" class="card-link">Done</a>
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
    }
  };



}


function deleteTask (id) {

  let payload = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  };

  fetch().then(response => {



  });
}





