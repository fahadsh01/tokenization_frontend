import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosinstance";
const statusStyles = {
  PENDING: "bg-yellow-100 text-yellow-800",
  APPROVED: "bg-green-100 text-green-800",
  SUSPANDED: "bg-red-100 text-red-800",
};

function MyPayments() {
  const [payments, setPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPayments = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await axiosInstance.get("/payment/getmyPayments", {
        withCredentials: true,
      });
      setPayments(res.data.data || []);

      if (!res.data.data?.length) {
        setMessage(res.data.message || "No payments found");
        setMessageType("success");
      }
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Failed to fetch payments"
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div className="p-4 md:p-6">
      {/* ===== Header ===== */}
      <h1 className="text-2xl font-semibold text-slate-800">My Payments</h1>
      <p className="text-sm text-slate-500 mb-6">
        Track your subscription payments and verification status
      </p>

      {/* ===== Loader ===== */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <span className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* ===== Message ===== */}
      {message && (
        <div
          className={`mb-4 text-sm text-center rounded-lg px-4 py-2 border
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

      {/* ===== Desktop Table ===== */}
      <div className="hidden md:block bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Method</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((pay) => (
              <tr
                key={pay._id}
                className="border-t hover:bg-slate-50"
              >
                <td className="px-4 py-3 font-medium">
                  PKR {pay.amount}
                </td>
                <td className="px-4 py-3">{pay.bank}</td>
                <td className="px-4 py-3 text-slate-500">
                  {new Date(pay.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[pay.status]}`}
                  >
                    {pay.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => setSelectedPayment(pay)}
                    className="px-3 py-1 text-xs rounded bg-blue-600 text-white hover:bg-blue-700"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== Mobile Cards ===== */}
      <div className="md:hidden space-y-4">
        {payments.map((pay) => (
          <div
            key={pay._id}
            className="bg-white rounded-lg shadow p-4 space-y-3"
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold text-slate-800">
                PKR {pay.amount}
              </p>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[pay.status]}`}
              >
                {pay.status}
              </span>
            </div>

            <div className="text-sm text-slate-600">
              <p>
                <span className="font-medium">Method:</span> {pay.bank}
              </p>
              <p>
                <span className="font-medium">Date:</span>{" "}
                {new Date(pay.createdAt).toLocaleDateString()}
              </p>
            </div>

            <button
              onClick={() => setSelectedPayment(pay)}
              className="w-full rounded bg-blue-600 py-2 text-sm text-white"
            >
              View Receipt
            </button>
          </div>
        ))}
      </div>

      {/* ===== Receipt Modal ===== */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl w-full max-w-md p-5 space-y-4">
            <h2 className="text-lg font-semibold text-slate-800">
              Payment Receipt
            </h2>

            <img
              src={selectedPayment.screenshot}
              alt="Payment Proof"
              className="w-full rounded-lg border"
            />

            <div className="text-sm text-slate-700 space-y-1">
              <p>
                <span className="font-medium">Amount:</span> PKR{" "}
                {selectedPayment.amount}
              </p>
              <p>
                <span className="font-medium">Method:</span>{" "}
                {selectedPayment.bank}
              </p>
              <p>
                <span className="font-medium">Date:</span>{" "}
                {new Date(
                  selectedPayment.createdAt
                ).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                {selectedPayment.status}
              </p>
            </div>

            <button
              onClick={() => setSelectedPayment(null)}
              className="w-full text-sm text-slate-500 pt-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyPayments;
