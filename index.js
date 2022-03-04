const { ipcRenderer } = require("electron");

let Todos = [];

function displayTodos(todos) {
  // Get the div inside which we are going to store the todos
  todosHTML = document.getElementById("todos");

  // Clear the contents of the div
  todosHTML.innerHTML = "";

  let i = 0;
  todos.forEach((todo) => {
    todosHTML.innerHTML +=
      '<label class="list-group-item d-flex gap-3 todo-checkbox"><input class="form-check-input flex-shrink-0" type="checkbox" id="todo-check-' +
      i +
      '"' +
      (todo.Done ? "checked" : "") +
      '><span class="pt-1 form-checked-content"><strong>' +
      todo.Description +
      "</strong></span></label>";
    i++;
  });

  ipcRenderer.send("updated-todos", Todos);

  for (let i = 0; i < Todos.length; i++) {
    document
      .getElementById("todo-check-" + i)
      .addEventListener("change", () => toggleTodo(i));
  }
}

ipcRenderer.on("displayTodos", (event, todos) => displayTodos(todos));

function addTodo() {
  // Get the description from the text box
  let description = document.getElementById("add-inp").value;

  // Add the todo to the list
  Todos.push({
    Description: description,
    Done: false,
  });

  // Display the updated list of todos
  displayTodos(Todos);
}

// Call add todo when add button is clicked
document.getElementById("add-btn").addEventListener("click", () => addTodo());

function toggleTodo(i) {
  Todos[i].Done = !Todos[i].Done;
  displayTodos(Todos);
}
