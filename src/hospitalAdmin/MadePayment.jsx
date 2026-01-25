import React, { useState } from "react";
import axiosInstance from "../axiosinstance"; 

function MadePayment() {
  const [title, setTitle] = useState("");
  const [bank, setBank] = useState("");
  const [amount, setAmount] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setScreenshot(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("bank", bank);
      formData.append("amount", amount);
      formData.append("screenshot", screenshot);

      const res = await axiosInstance.post(
        "/payment/createPayment",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(res.data.message || "Payment submitted successfully");
      setMessageType("success");

      // optional reset
      setTitle("");
      setBank("");
      setAmount("");
      setScreenshot(null);
      setPreview(null);

    } catch (err) {
      setMessage(
        err.response?.data?.message || "Something went wrong"
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">

        {/* Loader */}
        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <span className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Info Message */}
        <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4 text-blue-800">
          ℹ️ Your payment will be verified and your expiry status will be updated
          within <b>24 hours</b>.
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8">
          <h2 className="text-2xl font-semibold mb-6">Made Payment</h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Account Title */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Account Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border px-4 py-3"
                required
              />
            </div>

            {/* Bank */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Bank / Payment Method
              </label>
              <input
                type="text"
                value={bank}
                onChange={(e) => setBank(e.target.value)}
                placeholder="HBL, JazzCash, EasyPaisa"
                className="w-full rounded-lg border px-4 py-3"
                required
              />
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Paid Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-lg border px-4 py-3"
                required
              />
            </div>

            {/* Screenshot */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Payment Screenshot
              </label>

              <div className="border-2 border-dashed rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="screenshot"
                  required
                />

                {!preview ? (
                  <label htmlFor="screenshot" className="cursor-pointer text-slate-500">
                    📷 Click to upload screenshot
                  </label>
                ) : (
                  <img
                    src={preview}
                    alt="Preview"
                    className="max-h-64 mx-auto rounded"
                  />
                )}
              </div>
            </div>

            {/* Message */}
            {message && (
              <div
                className={`text-sm text-center rounded-lg px-4 py-2 border ${
                  messageType === "success"
                    ? "text-green-700 bg-green-50 border-green-200"
                    : "text-red-700 bg-red-50 border-red-200"
                }`}
              >
                {message}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 py-3 text-white font-medium hover:bg-blue-700"
            >
              Submit Payment Proof
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MadePayment;
