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
    const [settings, setSettings] = useState("BEFORE");
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
           settings,
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
    <div className="min-h-screen bg-slate-50 p-6">
  {/* Header */}
  <div className="mb-8">
    <h1 className="text-2xl font-semibold text-gray-800">
      Create Hospital
    </h1>
    <p className="text-sm text-gray-500">
      Register a new hospital tenant
    </p>
  </div>

  {/* Loader */}
  {loading && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <span className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
    </div>
  )}
<form
  onSubmit={handleSubmit}
  className="bg-white rounded-2xl shadow-sm p-6 w-full"
>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Hospital Name */}
      <input
        value={hospitalname}
        onChange={(e) => setHospitalname(e.target.value)}
        placeholder="Hospital Name"
        className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500"
      />

      {/* Full Name */}
      <input
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
        placeholder="Your Name"
        className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500"
      />

      {/* Tenant ID */}
      <input
        value={tenantid}
        onChange={(e) => setTenantid(e.target.value)}
        placeholder="Tenant ID"
        className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500"
      />

      {/* Admin Username */}
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Admin Username"
        className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500"
      />

      {/* Admin Password */}
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Admin Password"
        className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500"
      />

      {/* Contact */}
      <div>
        <input
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="923456789011"
          className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500"
        />
        <span className="mt-1 block text-xs text-gray-500">
          WhatsApp number must start with country code without operators
        </span>
      </div>

      {/* Settings */}
      <select
        value={planType}
        onChange={(e) => setSettings(e.target.value)}
        className="w-full rounded-lg border px-4 py-2 bg-white"
      >
        <option>BEFORE</option>
        <option>AFTER</option>
        <option>BOTH</option>
        <option>NONE</option>
      </select>

      {/* Subscription Plan */}
      <select
        value={planType}
        onChange={(e) => setPlanType(e.target.value)}
        className="w-full rounded-lg border px-4 py-2 bg-white"
      >
        <option>Monthly</option>
        <option>Yearly</option>
        <option>3 Years</option>
        <option>Trial</option>
      </select>

      {/* Price */}
      <input
        type="number"
        value={subscriptionPrice}
        onChange={(e) => setSubscriptionPrice(e.target.value)}
        placeholder="Subscription Price"
        className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-blue-500"
      />

      {/* Expiry */}
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
        className="w-full rounded-lg border px-4 py-2 bg-white"
      >
        <option>Active</option>
        <option>Blocked</option>
      </select>

      {/* WhatsApp Toggle */}
      <div className="md:col-span-2 flex items-center gap-3 pt-2">
        <input
          type="checkbox"
          checked={whatsappEnabled}
          onChange={(e) => setWhatsappEnabled(e.target.checked)}
          className="h-4 w-4"
        />
        <span className="text-sm font-medium text-gray-700">
          Enable WhatsApp Notifications
        </span>
      </div>

      {/* WhatsApp Config */}
      {whatsappEnabled && (
        <div className="md:col-span-2 rounded-xl border bg-slate-50 p-4 space-y-4">
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
        className={`mt-6 text-sm text-center rounded-lg px-4 py-2 border
          ${
            messageType === "success"
              ? "text-green-700 bg-green-50 border-green-200"
              : "text-red-700 bg-red-50 border-red-200"
          }`}
      >
        {message}
      </div>
    )}

    {/* Actions */}
    <div className="flex gap-4 mt-8">
      <button
        type="submit"
        disabled={loading}
        className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
      >
        {loading ? "Creating..." : "Create Hospital"}
      </button>

      <button
        type="reset"
        className="flex-1 py-3 bg-gray-200 rounded-lg font-medium hover:bg-gray-300 transition"
      >
        Reset
      </button>
    </div>
  </form>
</div>

  );
}

export default CreateTenant;
