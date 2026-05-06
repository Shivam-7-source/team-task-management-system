import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import API from "../services/api";
import toast from "react-hot-toast";

function Dashboard() {

  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

  const [user, setUser] = useState(null);

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    team: "",
  });

  const [editTaskId, setEditTaskId] = useState(null);

  const [showModal, setShowModal] = useState(false);

  // Fetch Tasks
  const fetchTasks = async () => {
    try {

      const res = await API.get("/tasks");

      setTasks(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

    fetchTasks();

    const token = localStorage.getItem("token");

    if (token) {

      const decoded = jwtDecode(token);

      setUser(decoded);
    }

  }, []);

  // Handle Input Change
  const handleChange = (e) => {

    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  };

  // Create & Update Task
  const createTask = async (e) => {

    e.preventDefault();

    try {

      // UPDATE TASK
      if (editTaskId) {

        await API.put(
          `/tasks/${editTaskId}`,
          taskData
        );

        toast.success("Task Updated Successfully");

        setEditTaskId(null);

        setShowModal(false);
      }

      // CREATE TASK
      else {

        await API.post(
          "/tasks",
          taskData
        );

        toast.success("Task Created Successfully");
      }

      fetchTasks();

      setTaskData({
        title: "",
        description: "",
        priority: "Medium",
        team: "",
      });

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );

      console.log(error);
    }
  };

  // Edit Task
  const editTask = (task) => {

    setTaskData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      team: task.team,
    });

    setEditTaskId(task._id);

    setShowModal(true);
  };

  // Update Status
  const updateStatus = async (id, status) => {

    try {

      await API.put(`/tasks/${id}`, {
        status,
      });

      toast.success(`Task marked ${status}`);

      fetchTasks();

    } catch (error) {

      console.log(error);
    }
  };

  // Delete Task
  const deleteTask = async (id) => {

    try {

      await API.delete(`/tasks/${id}`);

      toast.success("Task Deleted");

      fetchTasks();

    } catch (error) {

      console.log(error);
    }
  };

  // Logout
  const logoutHandler = () => {

    localStorage.removeItem("token");

    navigate("/");
  };

  // Stats
  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white p-6 overflow-hidden">

      {/* Background Glow */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-3xl rounded-full"></div>

      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-3xl rounded-full"></div>

      {/* Header */}
      <div className="relative flex justify-between items-center mb-10 bg-white/10 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500">

        <div>

          <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent tracking-wide">

            {user?.role === "admin"
              ? "Admin Dashboard"
              : `${user?.team} Dashboard`}

          </h1>

          <p className="text-gray-400 mt-3 text-lg font-medium tracking-wide">

            {user?.role === "admin"
              ? "Manage organization workflow and monitor all teams"
              : `Manage and track tasks assigned to the ${user?.team}`}

          </p>

        </div>

        <button
          type="button"
          onClick={logoutHandler}
          className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 hover:scale-105 active:scale-95 transition-all duration-300 text-white px-6 py-3 rounded-2xl shadow-lg font-semibold border border-red-400/20"
        >
          Logout
        </button>

      </div>

      {/* CREATE TASK FORM */}
      {user?.role === "admin" && !showModal && (

        <form
          onSubmit={createTask}
          className="bg-white/10 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-2xl mb-10 hover:shadow-cyan-500/20 transition-all duration-500"
        >

          <h2 className="text-3xl font-bold mb-6 text-cyan-400">
            Create Task
          </h2>

          <div className="grid md:grid-cols-4 gap-4">

            <input
              required
              type="text"
              name="title"
              placeholder="Task Title"
              value={taskData.title}
              onChange={handleChange}
              className="p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />

            <input
              required
              type="text"
              name="description"
              placeholder="Description"
              value={taskData.description}
              onChange={handleChange}
              className="p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />

            <select
              name="priority"
              value={taskData.priority}
              onChange={handleChange}
              className="p-4 rounded-2xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >

              <option value="Low" className="text-black">
                Low
              </option>

              <option value="Medium" className="text-black">
                Medium
              </option>

              <option value="High" className="text-black">
                High
              </option>

            </select>

            <select
              required
              name="team"
              value={taskData.team}
              onChange={handleChange}
              className="p-4 rounded-2xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >

              <option value="" className="text-black">
                Select Team
              </option>

              <option value="UI Team" className="text-black">
                UI Team
              </option>

              <option value="Backend Team" className="text-black">
                Backend Team
              </option>

              <option value="AI Team" className="text-black">
                AI Team
              </option>

              <option value="HR Team" className="text-black">
                HR Team
              </option>

              <option value="Marketing Team" className="text-black">
                Marketing Team
              </option>

            </select>

          </div>

          <button
            className="mt-6 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 hover:scale-105 active:scale-95 transition-all duration-300 text-black font-bold px-8 py-4 rounded-2xl shadow-xl"
          >
            Create Task
          </button>

        </form>
      )}

      {/* TASK STATS */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">

        <div className="bg-white/10 border border-white/10 rounded-3xl p-6 backdrop-blur-2xl shadow-xl hover:-translate-y-2 transition-all duration-300">
          <h2 className="text-gray-400 text-lg">
            Total Tasks
          </h2>

          <p className="text-4xl font-bold mt-4 text-cyan-400">
            {totalTasks}
          </p>
        </div>

        <div className="bg-white/10 border border-white/10 rounded-3xl p-6 backdrop-blur-2xl shadow-xl hover:-translate-y-2 transition-all duration-300">
          <h2 className="text-gray-400 text-lg">
            Completed
          </h2>

          <p className="text-4xl font-bold mt-4 text-green-400">
            {completedTasks}
          </p>
        </div>

        <div className="bg-white/10 border border-white/10 rounded-3xl p-6 backdrop-blur-2xl shadow-xl hover:-translate-y-2 transition-all duration-300">
          <h2 className="text-gray-400 text-lg">
            Pending
          </h2>

          <p className="text-4xl font-bold mt-4 text-yellow-400">
            {pendingTasks}
          </p>
        </div>

        <div className="bg-white/10 border border-white/10 rounded-3xl p-6 backdrop-blur-2xl shadow-xl hover:-translate-y-2 transition-all duration-300">
          <h2 className="text-gray-400 text-lg">
            In Progress
          </h2>

          <p className="text-4xl font-bold mt-4 text-blue-400">
            {inProgressTasks}
          </p>
        </div>

      </div>

      {/* TASKS */}
      <div className="grid md:grid-cols-3 gap-6">

        {tasks.map((task) => (

          <div
            key={task._id}
            className="bg-white/10 backdrop-blur-2xl border border-white/10 p-6 rounded-3xl shadow-2xl hover:scale-[1.03] hover:shadow-cyan-500/20 transition-all duration-500"
          >

            <h2 className="text-2xl font-bold mb-3 text-cyan-400">
              {task.title}
            </h2>

            <p className="text-gray-300 mb-5">
              {task.description}
            </p>

            <div className="space-y-2 mb-5">

              <p>
                <span className="font-semibold text-white">
                  Status:
                </span>{" "}
                <span className="text-cyan-300">
                  {task.status}
                </span>
              </p>

              <p>
                <span className="font-semibold text-white">
                  Priority:
                </span>{" "}
                {task.priority}
              </p>

              <p>
                <span className="font-semibold text-white">
                  Team:
                </span>{" "}
                <span className="text-pink-300">
                  {task.team}
                </span>
              </p>

            </div>

            {/* STATUS BUTTONS */}
            <div className="flex flex-wrap gap-2 mb-5">

              <button
                type="button"
                onClick={() =>
                  updateStatus(task._id, "Pending")
                }
                className="bg-yellow-400 hover:bg-yellow-300 hover:scale-105 active:scale-95 transition-all duration-300 text-black font-semibold px-3 py-2 rounded-xl"
              >
                Pending
              </button>

              <button
                type="button"
                onClick={() =>
                  updateStatus(task._id, "In Progress")
                }
                className="bg-blue-500 hover:bg-blue-400 hover:scale-105 active:scale-95 transition-all duration-300 text-white font-semibold px-3 py-2 rounded-xl"
              >
                Progress
              </button>

              <button
                type="button"
                onClick={() =>
                  updateStatus(task._id, "Completed")
                }
                className="bg-green-500 hover:bg-green-400 hover:scale-105 active:scale-95 transition-all duration-300 text-white font-semibold px-3 py-2 rounded-xl"
              >
                Complete
              </button>

            </div>

            {/* ADMIN BUTTONS */}
            {user?.role === "admin" && (

              <div className="flex gap-3">

                <button
                  type="button"
                  onClick={() => editTask(task)}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 hover:scale-105 active:scale-95 transition-all duration-300 text-black font-bold px-4 py-3 rounded-2xl"
                >
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => deleteTask(task._id)}
                  className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 hover:scale-105 active:scale-95 transition-all duration-300 text-white font-bold px-4 py-3 rounded-2xl"
                >
                  Delete
                </button>

              </div>

            )}

          </div>
        ))}

      </div>

    </div>
  );
}

export default Dashboard;