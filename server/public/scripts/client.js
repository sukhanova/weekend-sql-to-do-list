$(document).ready(onReady);

function onReady() {
    getTasks();
  $("#submitBtn").on("click", addNewTask);
  
}

function addNewTask(event) { 
    event.preventDefault(); // stop page refresh
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
        getTasks();
    }).catch(function (error) { 
        alert('error adding item: ', error);
    })
}

function getTasks() { 
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then((response) => { 
        console.log(response);
    }).catch(function (error){ 
        alert('error getting items', error);
    })
}