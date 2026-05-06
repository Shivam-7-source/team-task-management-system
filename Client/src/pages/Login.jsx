import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const res = await API.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);

      toast.success("Login Successful 🚀");

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-black px-4 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 blur-3xl rounded-full top-[-100px] left-[-100px]"></div>

      <div className="absolute w-[400px] h-[400px] bg-blue-500/20 blur-3xl rounded-full bottom-[-100px] right-[-100px]"></div>

      {/* Login Card */}
      <form
        onSubmit={handleSubmit}
        className="relative bg-white/10 backdrop-blur-2xl border border-white/10 p-10 rounded-3xl shadow-2xl w-full max-w-md hover:scale-[1.01] transition-all duration-500"
      >

        {/* Heading */}
        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-3">
            Welcome Back
          </h1>

          <p className="text-gray-300">
            Login to manage your tasks efficiently
          </p>

        </div>

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
          className="w-full p-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300 mb-6"
          onChange={handleChange}
        />

        {/* Login Button */}
        <button
          className="w-full bg-cyan-500 hover:bg-cyan-400 hover:scale-[1.02] active:scale-95 transition-all duration-300 text-black font-bold p-4 rounded-2xl shadow-xl"
        >
          Login
        </button>

        {/* Signup Link */}
        <p className="text-center mt-6 text-gray-300">
          Don't have an account?{" "}

          <Link
            to="/signup"
            className="text-cyan-400 hover:text-cyan-300 font-semibold transition-all duration-300"
          >
            Signup
          </Link>
        </p>

      </form>
    </div>
  );
}

export default Login;