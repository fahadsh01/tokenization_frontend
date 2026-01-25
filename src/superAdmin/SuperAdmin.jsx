import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosinstance";
function SuperAdminSidebar() {
  const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
  
const navigate = useNavigate();

 const handleClick = async () => {
      setLoading(true)

  try {
    const res = await axiosInstance.post(
      "/admin/logout",
      {},
      { withCredentials: true }
    );

    console.log(res);
    navigate("/login", { replace: true });
  } catch (error) {
    console.error(
      error.response?.data?.message || "Logout failed"
    );
  }
};

  return (
    <>
      {/* ===== TOP NAVBAR (MOBILE ONLY) ===== */}
      <header
        className="
          md:hidden fixed top-0 left-0 right-0 z-40
          flex items-center gap-3
          bg-slate-900 text-white
          px-4 py-3
          mb-4
        "
      >
        {/* ☰ moved to LEFT */}
        <button
          onClick={() => setOpen(true)}
          className="text-2xl focus:outline-none"
        >
          ☰
        </button>

        <h1 className=" justify-center font-semibold text-base">
          Super Admin
        </h1>
      </header>

      {/* ===== OVERLAY ===== */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ===== SIDEBAR ===== */}
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
        {/* Sidebar Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex justify-between items-center">
          <div>
            <h1 className="text-lg font-bold">Super Admin</h1>
            <p className="text-xs text-slate-400">Hospital System</p>
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
  to="/super-admin"
  end
  className={({ isActive }) =>
    `block px-4 py-2 rounded-lg text-sm font-medium ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-slate-300 hover:bg-slate-800"
    }`
  }
>
  ➕ Create Tenant
</NavLink>

<NavLink
  to="/super-admin/tenants-list"
  className={({ isActive }) =>
    `block px-4 py-2 rounded-lg text-sm font-medium ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-slate-300 hover:bg-slate-800"
    }`
  }
>
  🏥 Tenants
</NavLink>

<NavLink
  to="/super-admin/payments"
  className={({ isActive }) =>
    `block px-4 py-2 rounded-lg text-sm font-medium ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-slate-300 hover:bg-slate-800"
    }`
  }
>
  💳 Payments
</NavLink>

</nav>


        {/* Logout */}
         <div className="px-4 py-4 border-t border-slate-800">
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

export default SuperAdminSidebar;
