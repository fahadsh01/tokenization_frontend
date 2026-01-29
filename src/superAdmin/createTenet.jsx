import React, { useState } from "react";
import axiosInstance from "../axiosinstance";

function CreateTenant() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [hospitalname, setHospitalname] = useState("");
  const [tenantid, setTenantid] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [contact, setContact] = useState("");
  const [ planType, setPlanType] = useState("Monthly");
  const [subscriptionPrice, setSubscriptionPrice] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [status, setStatus] = useState("Active");
 const [messageType, setMessageType] = useState("");
  const [whatsappEnabled, setWhatsappEnabled] = useState(false);
  const [whatsappSender, setWhatsappSender] = useState("");
  const [twilioSid, setTwilioSid] = useState("");
  const [twilioToken, setTwilioToken] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
if (!planType) {
  setMessage("Please select a plan");
  return;
}
    try {
      await axiosInstance.post(
        "/users/register",
        {
          hospitalname,
          tenantid,
          username,
          fullname,
          password,
          contact,
           planType,
          subscriptionPrice,
          expiryDate,
          status,
          whatsappEnabled,
          whatsappConfig: whatsappEnabled
            ? {
                 whatsappSender,
                twilioSid,
                twilioToken,
              }
            : null,
        },
        { withCredentials: true }
      );

      setMessage("Hospital created successfully");
      setMessageType("success")
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
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Create Hospital
        </h1>
        <p className="text-sm text-gray-500">
          Register a new hospital tenant
        </p>
      </div>
      {loading && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <span className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
  </div>
)}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow p-6 max-w-3xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Hospital Name */}
          <input
            value={hospitalname}
            onChange={(e) => setHospitalname(e.target.value)}
            placeholder="Hospital Name"
            className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
  <input
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            placeholder="your Name"
            className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
          <input
            value={tenantid}
            onChange={(e) => setTenantid(e.target.value)}
            placeholder="Tenant ID"
            className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />

          {/* Admin Email */}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Admin username"
            className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
  <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin Password"
            className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
          {/* Contact Number */}
          <input
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Contact Number"
            className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />

          {/* Subscription Plan */}
          <select
            value={ planType}
            onChange={(e) => setPlanType(e.target.value)}
            className="w-full rounded-lg border px-4 py-2"
          >
            <option>Monthly</option>
            <option>Yearly</option>
            <option>3 Years</option>
            <option>Trial</option>
          </select>

          {/* Subscription Price */}
          <input
            type="number"
            value={subscriptionPrice}
            onChange={(e) => setSubscriptionPrice(e.target.value)}
            placeholder="Subscription Price"
            className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />

          {/* Expiry Date */}
          <input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500"
          />

          {/* Status */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-lg border px-4 py-2"
          >
            <option>Active</option>
            <option>Blocked</option>
          </select>

          {/* WhatsApp Toggle */}
          <div className="md:col-span-2 flex items-center gap-3">
            <input
              type="checkbox"
              checked={whatsappEnabled}
              onChange={(e) => setWhatsappEnabled(e.target.checked)}
            />
            <span className="text-sm font-medium text-gray-700">
              Enable WhatsApp Notifications
            </span>
          </div>

          {/* WhatsApp Config */}
          {whatsappEnabled && (
            <div className="md:col-span-2 space-y-4 p-4 border rounded-lg bg-slate-50">
              <input
                value={whatsappSender}
                onChange={(e) => setWhatsappSender(e.target.value)}
                placeholder="WhatsApp Sender Number"
                className="w-full rounded-lg border px-4 py-2"
              />

              <input
                value={twilioSid}
                onChange={(e) => setTwilioSid(e.target.value)}
                placeholder="Twilio Account SID"
                className="w-full rounded-lg border px-4 py-2"
              />

              <input
                type="password"
                value={twilioToken}
                onChange={(e) => setTwilioToken(e.target.value)}
                placeholder="Twilio Auth Token"
                className="w-full rounded-lg border px-4 py-2"
              />
            </div>
          )}
        </div>

        {/* Message */}
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


        {/* Actions */}
        <div className="flex gap-4 mt-8">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-3 bg-blue-600 text-white rounded-lg"
          >
            {loading ? "Creating..." : "Create Hospital"}
          </button>

          <button
            type="reset"
            className="flex-1 py-3 bg-gray-200 rounded-lg"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateTenant;
