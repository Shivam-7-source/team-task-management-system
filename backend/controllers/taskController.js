const Task = require("../models/Task");

// Create Task
const createTask = async (req, res) => {
  try {

    const {
      title,
      description,
      priority,
      team,
      assignedTo,
      dueDate,
    } = req.body;

    const task = await Task.create({
      title,
      description,
      priority,
      team,
      assignedTo,
      dueDate,
    });

    res.status(201).json(task);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Tasks Based On Role & Team
const getTasks = async (req, res) => {
  try {

    let tasks;

    // ADMIN CAN SEE ALL TASKS
    if (req.user.role === "admin") {

      tasks = await Task.find()
        .populate("assignedTo", "name email")
        .populate("project", "title");
    }

    // MEMBERS SEE ONLY THEIR TEAM TASKS
    else {

      tasks = await Task.find({
        team: req.user.team,
      })
        .populate("assignedTo", "name email")
        .populate("project", "title");
    }

    res.status(200).json(tasks);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Task
const updateTaskStatus = async (req, res) => {
  try {

    const {
      title,
      description,
      priority,
      status,
      team,
      assignedTo,
      dueDate,
    } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        priority,
        status,
        team,
        assignedTo,
        dueDate,
      },
      { new: true }
    );

    res.status(200).json(task);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Task
const deleteTask = async (req, res) => {
  try {

    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Task deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
};