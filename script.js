
document.addEventListener("DOMContentLoaded", function() {
  const addButton = document.getElementById("add-button");
  const searchInput = document.getElementById("search-input");
  const listContainer = document.getElementById("list-container");
  const taskLeft = document.getElementById("marked1"); // Element to display the number of tasks left

  // Load previous todos from localStorage if available
  const previousTodos = JSON.parse(localStorage.getItem("todos")) || [];
  previousTodos.forEach(todo => {
    createTodoElement(todo.text);
  });

  // Show default todos if there are no previous todos
  if (previousTodos.length=== 0) {
    const defaultTodos = [
      "Learn how to use Vue.js",
      "Drink coffee",
      "Wake up at 05:00 PM"
    ];
    defaultTodos.forEach(todoText => {
      createTodoElement(todoText);
      previousTodos.push({ text: todoText });
    });
    localStorage.setItem("todos", JSON.stringify(previousTodos));
  }

  updateTaskLeft(); // Call this function initially to update the task count

  addButton.addEventListener("click", function() {
    const text = searchInput.value.trim();
    if (text !== "") {
      createTodoElement(text);

      // Save new todo to localStorage
      const todos = JSON.parse(localStorage.getItem("todos")) || [];
      todos.push({ text });
      localStorage.setItem("todos", JSON.stringify(todos));

      searchInput.value = "";

      updateTaskLeft(); // Call this function to update the task count after adding a new todo
    }
  });

  function createTodoElement(text) {
    const listItem = document.createElement("li");
    listItem.classList.add("list-item");

    const itemText = document.createElement("span");
    itemText.textContent = text;

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "&#10006;"; // Cross symbol

    listItem.appendChild(itemText);
    listItem.appendChild(deleteButton);
    listContainer.appendChild(listItem);

    // Add event listener to delete button
    deleteButton.addEventListener("click", function() {
      listItem.remove();

      // Remove todo from localStorage
      const todos = JSON.parse(localStorage.getItem("todos")) || [];
      const index = todos.findIndex(todo => todo.text === text);
      if (index !== -1) {
        todos.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
      }

      updateTaskLeft(); // Call this function to update the task count after deleting a todo
    });
  }

  function updateTaskLeft() {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    const numTasksLeft = todos.length;
    taskLeft.textContent = `${numTasksLeft} task${numTasksLeft !== 1 ? 's' : ''} left`;
  }
});