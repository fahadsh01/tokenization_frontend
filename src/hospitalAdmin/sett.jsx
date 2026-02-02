// pages/Settings.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosinstance";

const Settings = () => {
  const [paymentMode, setPaymentMode] = useState("");
  const [initialMode, setInitialMode] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true)
      try {
        const res = await axiosInstance.get("/users/settings");
        const currentSetting = res.data?.data?.settings;
console.log("currenting",currentSetting)
        setPaymentMode(currentSetting);
        setInitialMode(currentSetting);

      } catch (err) {
        console.error("Failed to load settings");
      } finally{
        setLoading(false)
      }
    };

    fetchSettings();
  }, []);

  const handleSave = async () => {
    if (!paymentMode || paymentMode === initialMode) return;

    const confirmChange = window.confirm(
      "Changing settings will require you to login again. Continue?"
    );

    if (!confirmChange) return;

    try {
      setLoading(true);

      await axiosInstance.put("/users/change-settings", {
        settings: paymentMode,
      },        { withCredentials: true }
);

      alert("Settings updated successfully. Please login again.");
      window.location.href = "/login";
    } catch (err) {
      alert("Failed to update settings");
    } finally {
      setLoading(false);
    }
  };

  const settingLabels = {
    BEFORE: "Payment BEFORE checkup",
    AFTER: "Payment AFTER checkup",
    BOTH: "Allow BOTH",
    NONE: "Do NOT use payment system",
  };

  return (
   <div className="flex-1 min-h-screen bg-slate-50 px-6 py-8">
  {/* Page Header */}
  <div className="mb-8">
    <h1 className="text-3xl font-semibold text-slate-800">⚙️ Settings</h1>
    <p className="text-slate-500 mt-1">
      Manage hospital payment workflow
    </p>
  </div>

  {loading && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <span className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
    </div>
  )}

  {/* Current Mode Display */}
  {initialMode && (
    <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 max-w-xl">
      <p className="text-sm text-blue-700 font-medium">🔵 Current Payment Workflow</p>
      <p className="mt-1 text-blue-900 font-semibold">{settingLabels[initialMode]}</p>
    </div>
  )}

  {/* Settings Options */}
  <h2 className="text-lg font-medium text-slate-700 mb-4">Change Payment Workflow</h2>
  <p className="text-sm text-slate-500 mb-5">
    Choose how payments are handled in your hospital.
  </p>

  <div className="flex flex-wrap gap-4">
    {[
      { label: "Payment BEFORE checkup", value: "BEFORE" },
      { label: "Payment AFTER checkup", value: "AFTER" },
      { label: "Allow BOTH", value: "BOTH" },
      { label: "Do NOT use payment system", value: "NONE" },
    ].map((option) => (
      <label
        key={option.value}
        className={`flex items-center gap-2 border px-4 py-3 rounded-lg cursor-pointer transition
          ${
            paymentMode === option.value
              ? "border-blue-500 bg-blue-50"
              : "border-slate-200 hover:bg-slate-50"
          }`}
      >
        <input
          type="radio"
          name="paymentMode"
          value={option.value}
          checked={paymentMode === option.value}
          onChange={(e) => setPaymentMode(e.target.value)}
          className="h-4 w-4 accent-blue-600"
        />
        <span className="text-slate-700 font-medium">{option.label}</span>
      </label>
    ))}
  </div>

  {/* Save Button */}
  <div className="mt-6">
    <button
      onClick={handleSave}
      disabled={loading || paymentMode === initialMode}
      className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium
                 hover:bg-blue-700 transition disabled:opacity-50"
    >
      {loading ? "Saving..." : "Save Changes"}
    </button>
  </div>
</div>

  );
};

export default Settings;
