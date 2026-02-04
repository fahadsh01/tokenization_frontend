import React from "react";
import { useState } from "react";
import axiosInstance from "../axiosinstance";
const CreateAppointment = () => {
  const [patientName, setPatientName]=useState("")
    const [whatsapp ,setWhatsapp]=useState("")
    const [amount ,setamount]=useState(0)
    const [loading, setLoading] = useState(false);
      const [message, setMessage] = useState("");
      const [messageType, setMessageType] = useState(""); 
            const [time, setTime] = useState(""); 
  const [token,setToken]=useState({})
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
     const res= await axiosInstance.post(
        "/appointment/createappointment",
        {
          patientName,whatsapp,amount,time
        },
        { withCredentials: true }
      );
      setMessage(" Appionment created successfully");
      setMessageType("success")
      setToken(res.data.data)
        const desktopUrl = res.data.data.desktopUrl;
            window.location.href = desktopUrl;

    } catch (err) {
      setMessage(
        err.response?.data?.message || "Something went wrong"
      );
      setMessageType("error")

    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-4 md:p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Create Appointment
        </h1>
        <p className="text-sm text-gray-500">
          Register a patient and generate a token
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-5 md:p-6 w-full lg:max-w-xl">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Patient Name
              </label>
              <input
                type="text"
                placeholder="Enter patient name"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
                onChange={(e)=>{setPatientName(e.target.value)}}
              />
            </div>

            {/* WhatsApp Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                WhatsApp Number
              </label>
              <input
                type="text"
                placeholder="92500764334"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required           
                onChange={(e)=>{setWhatsapp(e.target.value)}}

             />
<span className="block mt-1 text-xs text-gray-500">
    WhatsApp number must start with country code without operators
  </span>            </div>
   <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment
              </label>
              <input
                type="number"
                placeholder="PKR"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                           onChange={(e)=>{setamount(e.target.value)}}

             />
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Appiontment Time
              </label>  
              <input
  type="time"
  onChange={(e) => {
    const value = e.target.value; // "15:00"
    const [h, m] = value.split(":");
    const hour = h % 12 || 12;
    const ampm = h >= 12 ? "PM" : "AM";
    setTime(`${hour}:${m} ${ampm}`);
  }}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
</div>

            {/* Submit Button */}
            <button
  disabled={loading}
  onClick={handleSubmit}
  className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
>
  {loading ? "Creating..." : "Create Appointment"}
</button>

          </div>
        </div>

        {/* RIGHT: Token Display Card */}
        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-center items-center text-center">
          <p className="text-sm text-gray-500 mb-2">Latest Generated Token</p>

          <div className="text-5xl md:text-6xl font-bold text-blue-600 mb-2">
{token.tokenNumber ?? "—"}
          </div>

          <p className="text-base md:text-lg font-medium text-gray-800">
           {token.patientName}
          </p>

  {message && (
  <div
    className={`mt-4 text-sm text-center rounded-lg px-4 py-2 border
      ${
        messageType === "success"
          ? "text-green-700 bg-green-50 border-green-200"
          : "text-red-700 bg-red-50 border-red-200"
      }
    `}
  >
    {message}
  </div>
)}         
        </div>
      </div>
    </div>
  );
};

export default CreateAppointment;
