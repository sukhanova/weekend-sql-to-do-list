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
  if ($("#newTaskIn").val() === "") {
    swal("Please enter new task");
  } else {
    console.log("in addNewTask", objectToSend);
    $.ajax({
      type: "POST",
      url: "/task",
      data: objectToSend,
    })
      .then(function (response) {
        console.log("back from POST:", response);
        getTasks();
        $("#newTaskIn").val("");
      })
      .catch(function (error) {
        alert("error adding item: ", error);
      });
  }
  
}

function getTasks() {
  $("#taskToDisplay").empty();
  $.ajax({
    type: "GET",
    url: "/tasks",
  })
    .then((response) => {
      console.log(response);
        for (let i = 0; i < response.length; i++) {
            let oneTask = response[i];
            console.log(oneTask);
            if (oneTask.complete === "YES") {
                $("#taskToDisplay").append(
                  `<tr>
                        <td align="center"><h3>${oneTask.task}</h3></td>
                        <td>DONE</td>
                        <td><button class="completedBtn" data-id='${oneTask.id}'>Completed</button></td>
                        <td><button class="deleteBtn" data-id='${oneTask.id}'>Delete</button></td>
                    </tr>`
                );
            } else {
                $("#taskToDisplay").append(
                  `<tr>
                        <td><strong><em>${oneTask.task}</strong></em></td>
                        <td>TODO</td>
                        <td><button class="editBtn" data-id='${oneTask.id}'>Complete</button></td>
                        <td><button class="deleteBtn" data-id='${oneTask.id}'>Delete</button></td>
                    </tr>`
                ); }

        } 
    })
    .catch(function (error) {
      alert("error getting items", error);
    });
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
                getTasks();
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
        getTasks();
    }).catch(function (error) { 
        console.log('error in updating task', error);
    })
}

