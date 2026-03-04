const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");


function loadTasks() {
  fetch("/tasks")
    .then(res => res.json())
    .then(data => {
      taskList.innerHTML = "";
      data.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
          ${task.title}
          <div>
            <button onclick="editTask(${task.id})">Edit</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
          </div>
        `;
        taskList.appendChild(li);
      });
    });
}

function addTask() {
  const title = taskInput.value;
  if (title === "") return;

  fetch("/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })
  }).then(() => {
    taskInput.value = "";
    loadTasks();
  });
}


function editTask(id) {
  const newTitle = prompt("Update task:");
  if (!newTitle) return;

  fetch(`/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: newTitle })
  }).then(loadTasks);
}


function deleteTask(id) {
  fetch(`/tasks/${id}`, {
    method: "DELETE"
  }).then(loadTasks);
}

loadTasks();