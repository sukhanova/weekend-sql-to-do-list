$(document).ready(readyNow);

function readyNow() {
  $("#submitBtn").on('click', addNewTask);
}

function addNewTask(event) {
    event.preventDefault();
  console.log("#submitBtn clicked!");
}
