const express = require("express");

const {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
} = require("../controllers/taskController");

const protect = require("../middleware/authMiddleware");

const adminOnly = require("../middleware/roleMiddleware");

const router = express.Router();

// ADMIN CREATE TASK
router.post(
  "/",
  protect,
  adminOnly,
  createTask
);

// GET TASKS
router.get(
  "/",
  protect,
  getTasks
);

// UPDATE TASK
router.put(
  "/:id",
  protect,
  updateTaskStatus
);

// DELETE TASK
router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteTask
);

module.exports = router;