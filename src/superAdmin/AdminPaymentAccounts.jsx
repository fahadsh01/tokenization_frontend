import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosinstance";

function AdminPaymentAccounts() {
  const [bank, setBank] = useState("");
  const [title, setTitle] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  /* ================= FETCH ACCOUNTS ================= */
  const fetchAccounts = async () => {
    try {
      setFetching(true);
      const res = await axiosInstance.get("/payment/getAccount", {
        withCredentials: true,
      });
      setAccounts(res.data?.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  /* ================= ADD ACCOUNT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axiosInstance.post(
        "/payment/addAccount",
        { bank, title, accountNumber },
        { withCredentials: true }
      );

      setMessage(res.data.message || "Account added successfully");
      setMessageType("success");

      setBank("");
      setTitle("");
      setAccountNumber("");

      await fetchAccounts(); 
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    if (!window.confirm("Remove this account?")) return;

    try {
      await axiosInstance.delete(`/payment/deleteAccount/${id}`, {
        withCredentials: true,
      });
      setAccounts((prev) => prev.filter((acc) => acc._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-4 md:p-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-800">
          Payment Accounts
        </h1>
        <p className="text-sm text-slate-500">
          Manage bank and wallet accounts for tenant payments
        </p>
      </div>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <span className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ===== LEFT: ADD ACCOUNT ===== */}
        <div className="lg:col-span-2 bg-white rounded-2xl  shadow-sm p-6 md:p-8">
          <h2 className="text-lg font-semibold mb-6">Add New Account</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">
                Bank / Wallet Name
              </label>
              <input
                type="text"
                value={bank}
                onChange={(e) => setBank(e.target.value)}
                className="w-full rounded-lg border px-4 py-3"
                required
              />
            </div>

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

            <div>
              <label className="block text-sm font-medium mb-2">
                Account Number
              </label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full rounded-lg border px-4 py-3"
                required
              />
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
              disabled={loading}
              type="submit"
              className="w-full rounded-lg bg-blue-600 py-3 text-white font-medium hover:bg-blue-700 disabled:opacity-60"
            >
              Add Account
            </button>
          </form>
        </div>
        <div className="bg-white rounded-2xl  shadow-sm p-6 space-y-4">
          <h3 className="text-lg font-semibold text-slate-800">
            Existing Accounts
          </h3>

          <p className="text-sm text-slate-500">
            These accounts are visible to tenants for payments
          </p>

          {fetching ? (
            <p className="text-sm text-slate-400">Loading accounts…</p>
          ) : (
            <div className="space-y-3">
              {accounts.map((acc) => (
                <div
                  key={acc._id}
                  className="rounded-xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4 hover:shadow-md transition"
                >
                  <p className="font-semibold text-slate-800">
                    🏦 {acc.bank}
                  </p>

                  <p className="text-sm text-slate-600 mt-1">
                    👤 {acc.title}
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    <p className="text-sm text-slate-600">
                      🔑 {acc.accountNumber}
                    </p>

                    <button
                      onClick={() => handleRemove(acc._id)}
                      className="text-xs text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              {accounts.length === 0 && (
                <p className="text-sm text-slate-400">
                  No accounts added yet
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPaymentAccounts;
