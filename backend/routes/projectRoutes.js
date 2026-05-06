const express = require("express");

const {
  createProject,
  getProjects,
} = require("../controllers/projectController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/roleMiddleware");

const router = express.Router();

// Admin Only
router.post("/", protect, adminOnly, createProject);

// Logged In Users
router.get("/", protect, getProjects);

module.exports = router;