$(document).ready(onReady);

function onReady() {
  $("#submitBtn").on("click", addNewTask);
  
}

function addNewTask(event) { 
    event.preventDefault();
    let objectToSend = {
        task: $('#newTaskIn').val()
    }
    console.log('in addNewTask', objectToSend);
    $.ajax({
        type: 'POST',
        url: '/task',
        data: objectToSend
    }).then(function (response) { 
        console.log('back from POST:', response);
    }).catch(function (error) { 
        alert('error adding item: ', error);
    })
}