import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosinstance";

const statusStyles = {
  WAITING: "bg-yellow-100 text-yellow-800",
  IN_PROGRESS: "bg-blue-100 text-blue-800",
  DONE: "bg-green-100 text-green-800",
};
function AppointmentsList() {
  const getButtonClass = (status) =>
  activeStatus === status
    ? "px-4 py-2 text-sm rounded bg-gray-800 text-white"
    : "px-4 py-2 text-sm rounded bg-gray-100 text-gray-700";
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
const [activeStatus, setActiveStatus] = useState("ALL");


  const fetchAppointments = async (status) => {
  setLoading(true);
  setMessage("");
  setActiveStatus(status);
  try {
    const res = await axiosInstance.get(
      "/appointment/getAppointment",
      {
        params: status?{ status } : {},
        withCredentials: true,
      }
    );
    setAppointments(res.data.data || []);
    if (!res.data.data?.length) {
      setMessage(res.data.message);
      setMessageType("success");
    }
  } catch (err) {
    setMessage(
      err.response?.data?.message || "Failed to fetch appointments"
    );
    setMessageType("error");
  } finally {
    setLoading(false);
  }
};
useEffect(() => {
  fetchAppointments("ALL"); // 👈 ONE source of truth
}, []);


  return (
    <div className="bg-gray-100 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Appointments
        </h1>
        <p className="text-sm text-gray-500">
          Today’s appointment queue
        </p>
      </div>

      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <span className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}

     <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-wrap gap-2">
    <button
    onClick={() => fetchAppointments("ALL")}
    className={getButtonClass("ALL")}
  >
    All
  </button>

  <button
    onClick={() => fetchAppointments("WAITING")}
    className={getButtonClass("WAITING")}
  >
    Waiting
  </button>

  <button
    onClick={() =>fetchAppointments("IN_PROGRESS")}
    className={getButtonClass("IN_PROGRESS")}
  >
    In Progress
  </button>

  <button
    onClick={() => fetchAppointments("DONE")}
    className={getButtonClass("DONE")}
  >
    Done
  </button>
</div>
      {message && (
        <div
          className={`mb-4 text-sm text-center rounded-lg px-4 py-2 border
            ${
              messageType === "success"
                ? "text-green-700 bg-green-50 border-green-200"
                : "text-red-700 bg-red-50 border-red-200"
            }`}
        >
          {message}
        </div>
      )}

      <div className="space-y-4 md:hidden">
        {appointments.map((appt) => (
          <div
            key={appt._id}
            className="bg-white rounded-lg shadow p-4 space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">
                #{appt.tokenNumber}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  statusStyles[appt.status]
                }`}
              >
                {appt.status.replace("_", " ")}
              </span>
            </div>

            <div>
              <p className="font-medium text-gray-800">
                {appt.patientName}
              </p>
              <p className="text-sm text-gray-500">
                {appt.whatsapp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ===== DESKTOP VIEW ===== */}
      <div className="hidden md:block bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-4 py-3">Token</th>
              <th className="text-left px-4 py-3">Patient</th>
              <th className="text-left px-4 py-3">WhatsApp</th>
              <th className="text-left px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr
                key={appt._id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-4 py-3 font-semibold">
                  #{appt.tokenNumber}
                </td>
                <td className="px-4 py-3">
                  {appt.patientName}
                </td>
                <td className="px-4 py-3">
                  {appt.whatsapp}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      statusStyles[appt.status]
                    }`}
                  >
                    {appt.status.replace("_", " ")}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AppointmentsList;
