const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Routes
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");

// Middleware
const protect = require("./middleware/authMiddleware");
const adminOnly = require("./middleware/roleMiddleware");

dotenv.config();

// Database Connection
connectDB();

const app = express();

// Middleware
app.use(
  cors({
    origin: "https://team-task-management-system-544.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Task Manager API Running");
});

// Auth Routes
app.use("/api/auth", authRoutes);

// Project Routes
app.use("/api/projects", projectRoutes);

// Task Routes
app.use("/api/tasks", taskRoutes);

// Protected Route
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

// Admin Only Route
app.get("/api/admin", protect, adminOnly, (req, res) => {
  res.json({
    message: "Welcome Admin",
  });
});

// Port
const PORT = process.env.PORT || 5000;

// Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});