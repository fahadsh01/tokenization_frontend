// pages/DoctorDashboard.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosinstance";

const DoctorDashboard = () => {
  const [summary, setSummary] = useState({});
const [sending, setSending] = useState(false);

  useEffect(() => {
    const fetchSummary = async () => {
      const res = await axiosInstance.get(
        "appointment/DoctorSummary",
        { withCredentials: true }
      );
      console.log("re",res)
      setSummary(res.data.data);
      console.log("umry",summary)
    };
    fetchSummary();
  }, []);

  const handleSendWhatsApp = async () => {
    setSending(true)
    const res = await axiosInstance.post(
      "appointment/sendWhatsapp",
      { withCredentials: true }
    );
    window.location.href = res.data.data.desktopUrl;
  };

  return (
    <div className="flex-1 min-h-screen bg-slate-50 px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-slate-800">
          👨‍⚕️ Dr. {summary.doctorName || "Doctor"}
        </h1>
        <p className="text-gray-500 mt-1">
          Today’s OPD Summary
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {/* Patients */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-center hover:shadow-md transition">
          <p className="text-slate-600 text-sm mb-2">
            Paid Patients 
          </p>
          <h2 className="text-4xl font-bold text-emerald-600">
            {summary.totalPatients}
          </h2>
        </div>

        {/* Earnings */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-center hover:shadow-md transition">
          <p className="text-slate-600 text-sm mb-2">
            Total Earnings
          </p>
          <h2 className="text-4xl font-bold text-blue-600">
            PKR&nbsp;{summary.totalAmount}
          </h2>
        </div>

        {/* Waiting */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-center hover:shadow-md transition">
          <p className="text-slate-600 text-sm mb-2">
            In Waiting
          </p>
          <h2 className="text-4xl font-bold text-amber-500">
            {summary.waitingPatients}
          </h2>
        </div>

         <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 text-center hover:shadow-md transition">
          <p className="text-slate-600 text-sm mb-2">
            Todays Checked Patients
          </p>
          <h2 className="text-4xl font-bold text-green-500">
            {summary.donePatients}
          </h2>
        </div>
        {/* WhatsApp */}
        
      </div>
<div className="flex justify-center">
  <button
    onClick={handleSendWhatsApp}
    className="w-full sm:w-auto flex items-center justify-center gap-2
               bg-green-500 text-white px-8 py-3 rounded-xl
               font-semibold shadow-sm
               hover:bg-green-600 hover:shadow-md
               active:scale-[0.98]
               transition-all duration-200"
  >
    <span className="text-lg">📲</span>
    Send via WhatsApp
  </button>
</div>



      {/* Footer */}
      <p className="text-slate-400 text-sm">
        Summary is calculated based on today’s paid appointments.
      </p>
    </div>
  );
};

export default DoctorDashboard;



 await Appointment.find({
    tenant_id: tenantId,
    status: "WAITING",
     appointmentDatePK: { $in: [yesterdayPK, todayPK] }, 
  }).sort({ appointmentDatePK: 1 ,tokenNumber: 1 });