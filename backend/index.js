require("dotenv").config();

const db = require("./database/db");

const port = process.env.PORT;

const express = require("express");

const app = express();

app.use(express.json());

// app.get("/", (req, res) => {
//   res.json({ mensagem: "Funcionando!" });
// });

// Insert an user
app.post("/create/user", async (req, res) => {
  const user = await db.insertUser(req.body);
  res.sendStatus(201);
});

// Select all tasks by user
app.get("/tasks/:id", async (req, res) => {
  const tasks = await db.selectTasks(req.params.id);
  res.json(tasks);
});

// Insert a task
app.post("/create/task", async (req, res) => {
  const tasks = await db.insertTask(req.body);
  res.sendStatus(201);
});

// Update a task
app.patch("/tasks/:id", async (req, res) => {
  await db.updateTask(req.params.id, req.body);
  res.sendStatus(200);
});

// Delete task
app.delete("/tasks/:id", async (req, res) => {
  await db.deleteTask(req.params.id);
  res.sendStatus(204);
});

app.listen(port);
console.log("Backend rodando...");
