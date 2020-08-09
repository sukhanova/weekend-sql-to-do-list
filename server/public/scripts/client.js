$(document).ready(onReady);

function onReady() {
    getTasks();
  $("#submitBtn").on("click", addNewTask);
    $("#taskToDisplay").on("click", ".deleteBtn", deleteTask);
    $("#taskToDisplay").on("click", ".editBtn", markComplete);
    
}

function addNewTask(event) {
  event.preventDefault(); // stop page refresh
  let objectToSend = {
    task: $("#newTaskIn").val(),
  };
  if (objectToSend.task === "") {
    swal("Please enter new task");
  }
  console.log("in addNewTask", objectToSend);
  $.ajax({
    type: "POST",
    url: "/task",
    data: objectToSend,
  })
    .then(function (response) {
      console.log("back from POST:", response);
    })
    .catch(function (error) {
      alert("error adding item: ", error);
    });
}

function getTasks() {
  $.ajax({
    type: "GET",
    url: "/tasks",
  })
    .then((response) => {
      console.log(response);
      appendTasks(response);
    })
    .catch(function (error) {
      alert("error getting items", error);
    });
}

// append tasks to dom
function appendTasks(response) {
  $("#taskToDisplay").empty();
  for (let i = 0; i < response.length; i++) {
    let oneTask = response[i];
    console.log(oneTask);
    if (oneTask.complete === "YES") {
      $("#taskToDisplay").append(
        `<tr>
                    <td align="center"><h3>${oneTask.task}</h3></td>
                    <td>${oneTask.complete}</td>
                    <td><button class="editBtn" data-id='${oneTask.id}'>Complete</button></td>
                    <td><button class="deleteBtn" data-id='${oneTask.id}'>Delete</button></td>
                </tr>`
      );
    } else {
      $("#taskToDisplay").append(
        `<tr>
                    <td>${oneTask.task}</td>
                    <td>${oneTask.complete}</td>
                    <td><button class="editBtn" data-id='${oneTask.id}'>Complete</button></td>
                    <td><button class="deleteBtn" data-id='${oneTask.id}'>Delete</button></td>   
                </tr>`
      );
    }
  }
}

function deleteTask() {
    console.log("Delete button clicked!");
    let idToDelete = $(this).data('id');
    console.log(idToDelete);
    swal({
      title: "Are you sure you want to delete a task?",
      text: "Once deleted, task will disappear!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete => {
        if (willDelete) {
            swal("Task is deleted!", {
                icon: "success",
            });
            $.ajax({
                method: "DELETE",
                url: `/tasks/${idToDelete}`
            }).then(function (response) {
                appendTasks();
            }).catch(function (error) {
                console.log('error deleting task', error)
            })
        } else { 
            swal("Your task is safe");
        }
    }))
}

function markComplete() { 
    console.log('EDIT button clicked!')
    let idToUpdate = $(this).data("id");
    let taskStatus = {
        complete: 'YES'
    }
    console.log(idToUpdate);
    $.ajax({
      method: "PUT",
        url: `/tasks/${idToUpdate}`,
        data: { complete: !taskStatus }
    }).then(function () { 
        appendTasks();
    }).catch(function (error) { 
        console.log('error in updating task', error);
    })
}

