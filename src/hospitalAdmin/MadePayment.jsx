import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosinstance";

function MadePayment() {
  const [title, setTitle] = useState("");
  const [bank, setBank] = useState("");
  const [amount, setAmount] = useState("");
  const [planType, setPlanType] = useState("Monthly");
  const [screenshot, setScreenshot] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [paymentAccounts, setPaymentAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await axiosInstance.get("/payment/getAccount", {
          withCredentials: true,
        });
        setPaymentAccounts(res.data.data || []);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAccounts();
  }, []);

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
      formData.append("planType", planType);
      formData.append("screenshot", screenshot);

      const res = await axiosInstance.post(
        "/payment/createPayment",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setMessage(res.data.message || "Payment submitted successfully");
      setMessageType("success");

      setTitle("");
      setBank("");
      setAmount("");
      setScreenshot(null);
      setPreview(null);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Made Payment
        </h1>
        <p className="text-sm text-gray-500">
          Submit your payment proof and view our official payment accounts
        </p>
      </div>
      <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4 text-blue-800">
        ℹ️ Your payment will be verified within <b>24 hours</b>.
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-4 md:p-6">
          <h2 className="text-xl font-semibold mb-6">
            Payment Details
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Account Title
              </label>
              <input
                type="text"
                value={title}
                 placeholder="your account title"
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Bank / Method
              </label>
              <input
                type="text"
                value={bank}
                placeholder="Hbl,jazzcash,easypassa"
                onChange={(e) => setBank(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Amount
              </label>
              <input
                type="text"
                value={amount}
                placeholder="PKR"
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
           <select
  value={planType}
  onChange={(e) => setPlanType(e.target.value)}
  className="
    w-full rounded-lg border border-slate-300
    bg-white px-4 py-3 text-slate-700
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
    transition
  "
>
  <option value="Monthly">Monthly</option>
  <option value="Yearly">Yearly</option>
  <option value="3 Years">3 Years</option>
</select>


            <div>
              <label className="block text-sm font-medium mb-2">
                Payment Screenshot
              </label>
              <label className="block border-2 border-dashed rounded-lg p-6 text-center cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="max-h-64 mx-auto rounded"
                  />
                ) : (
                  "📷 Click to upload screenshot"
                )}
              </label>
            </div>
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

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 py-3 text-white font-medium hover:bg-blue-700"
            >
              {loading ? "Submitting..." : "Submit Payment Proof"}
            </button>
          </form>
        </div>
       <div className="bg-white rounded-2xl shadow-sm  p-5 sticky top-6">
  {/* Header */}
  <div className="mb-4">
    <h3 className="text-lg font-semibold text-slate-800">
      💳 Our Payment Accounts
    </h3>
    <p className="text-sm text-slate-500 mt-1">
      Transfer payment to any account below
    </p>
  </div>

  {/* Accounts */}
  <div className="space-y-4">
    {paymentAccounts.map((acc) => (
      <div
        key={acc._id}
        className="
          group rounded-xl border border-slate-200 
          bg-gradient-to-br from-white to-slate-50
          p-4 transition-all duration-300
          hover:shadow-md hover:border-slate-300
        "
      >
        <p className="text-base font-semibold text-slate-800 flex items-center gap-2">
          🏦 {acc.bank}
        </p>
        <p className="text-sm text-slate-600 mt-2 flex items-center gap-2">
          <span className="font-medium text-slate-700">
            👤 Title:
          </span>
          {acc.title}
        </p>
        <div className="flex items-center justify-between mt-1">
          <p className="text-sm text-slate-600 flex items-center gap-2">
            <span className="font-medium text-slate-700">
              🔑 A/C:
            </span>
            {acc.accountNumber}
          </p>

          {/* Copy Button */}
          <button
            onClick={() =>
              navigator.clipboard.writeText(acc.accountNumber)
            }
            className="
              text-xs px-3 py-1 rounded-md
              bg-slate-100 text-slate-700
              hover:bg-slate-200
              opacity-0 group-hover:opacity-100
              transition
            "
          >
            Copy
          </button>
        </div>
      </div>
    ))}
  </div>

  {/* Warning */}
  <div className="mt-5 rounded-lg bg-amber-50 border border-amber-200 p-3">
    <p className="text-xs text-amber-700">
      ⚠️ Payments sent to accounts other than these will not be verified.
    </p>
  </div>
</div>

      </div>
    </div>
  );
}

export default MadePayment;
