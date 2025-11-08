let todos = [];

window.onload = function () {
  const saved = localStorage.getItem("todos");
  if (saved) {
    todos = JSON.parse(saved);
  }
  renderTodos();
};

function addTodo() {
  const input = document.getElementById("todo-input");
  const value = input.value.trim();

  if (value === "") return;
  todos.push({ text: value, completed: false });

  input.value = "";

  saveTodos();
  renderTodos();
}

function renderTodos() {
  const listContainer = document.getElementById("todos-list");
  const progress = document.getElementById("todo-count");

  // Clear previous list
  listContainer.innerHTML = "";

  if (todos.length === 0) {
    listContainer.className = "todos-empty";
    listContainer.textContent = "Start by adding a todo";
    progress.textContent = "0 / 0 todo completed";
    return;
  } else {
    listContainer.className = "";
    const ul = document.createElement("ul");
    ul.style.listStyle = "none";
    ul.style.padding = "0";
    ul.style.margin = "0";

    let completedCount = 0;

    todos.forEach((todo, index) => {
      const li = document.createElement("li");
      li.textContent = todo.text;
      li.style.cursor = "pointer";
      li.style.fontSize = "16px";

      if (todo.completed) {
        li.style.textDecoration = "line-through";
        li.style.color = "#aaa";
        completedCount++;
      }

      // Toggle completed
      li.onclick = function () {
        todos[index].completed = !todos[index].completed;
        saveTodos();
        renderTodos();
      };

      // Delete button
      const delBtn = document.createElement("button");
      delBtn.textContent = "❌";
      delBtn.className = "delete-x";
      delBtn.onclick = function (e) {
        e.stopPropagation(); // Prevent toggle complete
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
      };

      li.appendChild(delBtn);
      ul.appendChild(li);
    });

    listContainer.appendChild(ul);

    progress.textContent = `${completedCount} / ${todos.length} todo completed`;
  }
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
