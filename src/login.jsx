import React from "react";
import { useState} from "react";
import { useNavigate } from "react-router-dom";
import  axiosInstance from "./axiosinstance"
function Login() {
const [username , setUsername]=useState("")
const [password , setPassword]=useState("")
const [message, setMessage] = useState( "" );
const [loading, setLoading] = useState(false);

const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);

  try {
    const res = await axiosInstance.post(
      "/admin/login",
      { username, password },
      { withCredentials: true }
    );

    const role = res.data.data.user.role;

    setMessage("Login successful");

    if (role === "SUPER_ADMIN") {
      navigate("/super-admin");
    } else if (role === "HOSPITAL_ADMIN") {
      navigate("/hospital");
    }

  } catch (err) {
    setMessage(
      err.response?.data?.message || "Invalid credentials"
    )
    console.log("here is the ",message)
        console.log("here is the ",err.response?.data?.message )

  }
   finally {
    setLoading(false);
  }
};


  return (
  <div className="min-h-screen relative bg-slate-100 flex flex-col overflow-hidden">
      {loading && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <span className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
  </div>
)}
      {/* ===== Background Decoration ===== */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* ===== Header ===== */}
      <header className="relative z-10 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-slate-800">
          SysVON
        </h1>
        <span className="text-sm text-slate-500">
          Hospital Management System
        </span>
      </header>

      {/* ===== Main Content ===== */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8">
          
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Sign in to continue
            </p>
          </div>

          {/* ===== Form ===== */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Error Message */}
          {message && (
  <p className="text-sm text-red-600 text-center bg-red-50 border border-red-200 rounded-lg py-2 px-3 transition-all duration-300 ease-in-out animate-fade-in">
    {message}
  </p>
)}



            {/* Remember / Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="rounded" />
                Remember me
              </label>
              <button
                type="button"
                className="text-blue-600 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
          <button
  type="submit"
  disabled={loading}
  className="w-full py-3 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-60"
>
  Login
</button>


          </form>
        </div>
      </main>

      {/* ===== Footer ===== */}
      <footer className="relative z-10 py-4 text-center text-xs text-gray-500">
        Built & Maintained by{" "}
        <a
          href="https://sysvon.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-slate-700 hover:underline"
        >
          SysVON Digital Solutions
        </a>{" "}
        © {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default Login;
