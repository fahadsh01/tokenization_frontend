import React from "react";
import {  Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "./axiosinstance";
import LoadingSpinner from "./LoadingSpinner"
function ProtectedRoute({ roles }) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    axiosInstance
      .get("/users/authme")
      .then((res) => {
        const role = res.data.data.role;
  
        if (roles.includes(role)) {
          setAllowed(true);
        } else {
          setAllowed(false);
        }
      })
      .catch(() => {
        setAllowed(false);
      })
      .finally(() => setLoading(false));
  }, [roles]);
  

  if (loading) return <LoadingSpinner />; // or spinner


  return <Outlet />;
}

export default ProtectedRoute;
