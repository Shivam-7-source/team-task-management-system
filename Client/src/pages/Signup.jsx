import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
    team: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await API.post("/auth/register", formData);

      toast.success("Signup Successful 🚀");

      navigate("/");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Signup Failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-black px-4 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 blur-3xl rounded-full top-[-100px] left-[-100px]"></div>

      <div className="absolute w-[400px] h-[400px] bg-blue-500/20 blur-3xl rounded-full bottom-[-100px] right-[-100px]"></div>

      {/* Signup Card */}
      <form
        onSubmit={handleSubmit}
        className="relative bg-white/10 backdrop-blur-2xl border border-white/10 p-10 rounded-3xl shadow-2xl w-full max-w-md hover:scale-[1.01] transition-all duration-500"
      >

        {/* Heading */}
        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-3">
            Create Account
          </h1>

          <p className="text-gray-300">
            Join your organization workspace 🚀
          </p>

        </div>

        {/* Name Input */}
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300 mb-5"
          onChange={handleChange}
        />

        {/* Email Input */}
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300 mb-5"
          onChange={handleChange}
        />

        {/* Password Input */}
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300 mb-5"
          onChange={handleChange}
        />

        {/* Role Select */}
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300 mb-5"
        >

          <option value="member" className="text-black">
            Member
          </option>

          <option value="admin" className="text-black">
            Admin
          </option>

        </select>

        {/* Team Select Only For Members */}
        {formData.role === "member" && (

          <select
            name="team"
            value={formData.team}
            onChange={handleChange}
            className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300 mb-6"
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

            <option value="Management Team" className="text-black">
              Management Team
            </option>

          </select>

        )}

        {/* Signup Button */}
        <button
          className="w-full bg-cyan-500 hover:bg-cyan-400 hover:scale-[1.02] active:scale-95 transition-all duration-300 text-black font-bold p-4 rounded-2xl shadow-xl"
        >
          Signup
        </button>

        {/* Login Link */}
        <p className="text-center mt-6 text-gray-300">

          Already have an account?{" "}

          <Link
            to="/"
            className="text-cyan-400 hover:text-cyan-300 font-semibold transition-all duration-300"
          >
            Login
          </Link>

        </p>

      </form>
    </div>
  );
}

export default Signup;