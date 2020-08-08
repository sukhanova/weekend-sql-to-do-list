$(document).ready(readyNow);

function readyNow() {
  $("#submitBtn").on("click", addNewTask);
}

function addNewTask(event) {
    event.preventDefault();
    console.log("#submitBtn clicked!");
    const objectToSend = {
        task: $('#newTaskIn').val(),
    }
    console.log('in addNewTask:', objectToSend);
    $.ajax({
        method: 'POST',
        url: '/task',
        data: objectToSend
    }).then(function (response) { 
        console.log(response);
    }).catch(function (error) { 
        alert(`error adding task`);
        console.log(error);
    })
}