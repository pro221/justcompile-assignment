const mongoose = require("mongoose");

// Define Todo item schema
const todoSchema = new mongoose.Schema({
  task: String,
});

// Create Todo model
module.exports = mongoose.model("todos", todoSchema);
