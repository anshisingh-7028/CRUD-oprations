const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let tasks = [];
let idCounter = 1;


app.post("/tasks", (req, res) => {
  const task = {
    id: idCounter++,
    title: req.body.title
  };
  tasks.push(task);
  res.json(task);
});


app.get("/tasks", (req, res) => {
  res.json(tasks);
});


app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);

  if (task) {
    task.title = req.body.title;
    res.json(task);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});


app.delete("/tasks/:id", (req, res) => {
  tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
  res.json({ message: "Task deleted" });
});

app.listen(3200);