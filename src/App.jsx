import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Navigate} from "react-router-dom";
import Login from "./login";
import Dashboard from "./hospitalAdmin/adminDasbord";
import DashboardA from "./superAdmin/superAdminDashbord";
import ProtectedRoute from "./ProtectedRoute";
function App() {
  return (
   <Router>
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route element={<ProtectedRoute roles={["SUPER_ADMIN"]} />}>
      <Route path="/super-admin/*" element={<DashboardA />} />
    </Route>
    <Route element={<ProtectedRoute roles={["HOSPITAL_ADMIN"]} />}>
      <Route path="/hospital/*" element={<Dashboard />} />
    </Route>
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>

</Router>

  );
}

export default App;
