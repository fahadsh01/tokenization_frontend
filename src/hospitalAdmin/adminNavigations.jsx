import React, { useState } from "react";
  import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axiosInstance from "../axiosinstance";
import { useEffect } from "react";
function HospitalSidebar() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState({});
 useEffect(() => {
  const fetchUserProfile = async () => {
    try {
      const res = await axiosInstance.get(
        "/users/getUserProfile",
        { withCredentials: true }
      );
console.log(res.data.data)
      setProfile(res.data.data);
    } catch (error) {
      console.error(
        error.response?.data?.message || "Failed to fetch user profile"
      );
    }
  };

  fetchUserProfile();
}, []);

  const navigate = useNavigate();

  const handleClick = async () => {
    setLoading(true)
    try {
      await axiosInstance.post(
        "/admin/logout",
        {},
        { withCredentials: true }
      );

      navigate("/login", { replace: true });
    } catch (error) {
      console.error(
        error.response?.data?.message || "Logout failed"
      );
    }
  };
  return (
    <>
      <header
        className="
          md:hidden fixed top-0 left-0 right-0 z-40
          flex items-center gap-3
          bg-slate-900 text-white
          px-4 py-3
          mb-4
        "
      >        <button
          onClick={() => setOpen(true)}
          className="text-2xl focus:outline-none"
        >
          ☰
        </button>

        <h1 className=" justify-center font-semibold ">
    {profile?.hospitalname}
        </h1>
      </header>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed md:static top-0 left-0 z-50
          w-64 min-h-screen bg-slate-900 text-white
          flex flex-col
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="px-6 py-5 border-b border-slate-800 flex justify-between items-center">
    <div>
  <h1 className=" font-semibold">
    {profile?.hospitalname}
  </h1>

  <h3 className="text-sm font-medium">
    Status: {profile?.status}
  </h3>
  <p className="text-[11px] text-slate-400">
    Product of Sysvon Digital Solution
  </p>
</div>
          <button
            onClick={() => setOpen(false)}
            className="md:hidden text-xl"
          >
            ✕
          </button>
        </div>
 
        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          <NavLink
            to="/hospital"
            end
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg text-sm font-medium ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
            ➕ Create Appointment
          </NavLink>

          <NavLink
            to="/hospital/appointments-list"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg text-sm font-medium ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
            🏥Appointments List
          </NavLink>

          <NavLink
            to="/hospital/live-token"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg text-sm font-medium ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
             Live Token
          </NavLink>
           <NavLink 

            to="/hospital/madePayment"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg text-sm font-medium ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
Made-Payment          </NavLink>
    <NavLink 

            to="/hospital/myPayments"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg text-sm font-medium ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
MyPayments          </NavLink>
 <NavLink 

            to="/hospital/summary"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg text-sm font-medium ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
Summary          </NavLink>
 <NavLink 

            to="/hospital/overview"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg text-sm font-medium ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
  Guide        </NavLink>
  <NavLink 

            to="/hospital/settings"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg text-sm font-medium ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
 Settings        </NavLink>
        </nav>

        {/* Logout */}

       <div className="px-4 py-4 border-t border-slate-800">
        <h3 className="text-sm font-medium">
    Subscription: {profile?.planType}
  </h3>

  <h3
    className={`text-sm font-medium ${
      new Date(profile?.expiryDate) < new Date()
        ? "text-red-500"
        : "text-green-400"
    }`}
  >
    Expiry Date: {profile?.expiryDate 
      ? `${new Date(profile.expiryDate).getDate()}-${new Date(profile.expiryDate).getMonth()+1}-${new Date(profile.expiryDate).getFullYear()}`
      : "N/A"
    }
  </h3>
  <button
    onClick={handleClick}
    disabled={loading}
    className={`w-full px-4 py-2 rounded-lg text-sm text-white transition
      ${loading ? "bg-red-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}
    `}
  >
    {loading ? "Logging out..." : "Logout"}
  </button>
</div>

      </aside>
      {/* ===== Spacer for navbar height + margin ===== */}
      <div className="md:hidden h-20" />
    </>
  );
}

export default HospitalSidebar;
