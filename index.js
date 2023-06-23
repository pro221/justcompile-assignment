const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("./db/config");

const User = require("./db/User");
const Todo = require("./db/Todo");

// Create an Express server
const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  res.send(result);
});

app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      res.send(user);
    } else {
      res.send({ result: "no user found.." });
    }
  } else {
    res.send({ result: "no user found" });
  }
});

// app.get("/api/todos", async (req, res) => {
//   try {
//     const todos = await Todo.find();
//     res.json(todos);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.post("/api/todos", async (req, res) => {
//   try {
//     const todo = new Todo(req.body);
//     const savedTodo = await todo.save();
//     res.status(201).json(savedTodo);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

app.post("/api/todos", async (req, res) => {
  const { task } = req.body;
  const newTodo = new Todo({ task });

  try {
    await newTodo.save();
    res.json(newTodo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
app.listen(8080);
