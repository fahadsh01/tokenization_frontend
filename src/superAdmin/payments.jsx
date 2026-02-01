import React, { useState,useEffect } from "react";
import axiosInstance from "../axiosinstance";

const statusStyles = {
  PENDING: "bg-yellow-100 text-yellow-800",
  APPROVED: "bg-green-100 text-green-800",
  SUSPENDED: "bg-red-100 text-red-800",
};
function SuperAdminPayments() {
  const [activeTab, setActiveTab] = useState("PENDING");
    const getButtonClass = (status) =>
 activeTab === status
    ? "px-4 py-2 text-sm rounded bg-blue-600 text-white"
    : "px-4 py-2 text-sm rounded bg-gray-100 text-gray-700";
    const [loading, setLoading] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
   const [paymenttlist, setPaymentlist] = useState([]);
   const [messagee, setMessagee] = useState("");
     const [messageTypee, setMessageTypee] = useState("");
     const [message, setMessage] = useState("");
     const [messageType, setMessageType] = useState("");
    const [ planType, setPlanType] = useState("");
    const [  price, setPrice] = useState("");
    const [  expiryDate, setExpiryDate] = useState(""); 
  const fetchPayments = async (status) => {
    setActiveTab(status)
    setLoading(true);
  setMessage("");
  try {
    const res = await axiosInstance.get(
      "/payment/getPayments",
      {
        params: status?{ status } : {},
        withCredentials: true,
      }
    );
    setPaymentlist(res.data.data || []);
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
   fetchPayments("PENDING"); 
}, []);
const handleclick = async (tenantid) => {
  setLoading(true);
  setMessagee("");
  try {
    const res = await axiosInstance.post(
      "/payment/PaymentApproval",
      {
        tenantid,
        expiryDate,
        price,
        planType,
      },
      {
        withCredentials: true,
      }
    );
    setMessagee(res.data.message);
    setMessageTypee("success");
  } catch (err) {
    setMessagee(
      err.response?.data?.message || "Payment approval failed"
    );
    setMessageTypee("error");
  } finally {
    setLoading(false);

  }
};
const handleclick1 = async (tenantid) => {
  setLoading(true);
  setMessagee("");
  try {
    const res = await axiosInstance.post(
      "/payment/rejectPayment",
      {
        tenantid,
      },
      {
        withCredentials: true,
      }
    );
    setMessagee(res.data.message);
    setMessageTypee("success");
  } catch (err) {
    setMessagee(
      err.response?.data?.message || "Payment approval failed"
    );
    setMessageTypee("error");
  } finally {
    setLoading(false);

  }
};
  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-800">
        Payment Verifications
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        Review incoming payments and update subscription details
      </p>

 <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-wrap gap-2">
    <button
    onClick={() =>  fetchPayments("PENDING")}
    className={getButtonClass("PENDING")}
  >
PENDING  </button>

  <button
    onClick={() =>  fetchPayments("APPROVED")}
    className={getButtonClass("APPROVED")}
  >
    APPROVED
  </button>

  <button
    onClick={() => fetchPayments("SUSPENDED")}
    className={getButtonClass("SUSPENDED")}
  >
SUSPENDED  </button>

  
</div>
  {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <span className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}
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
      {/* Table */}
<div className="hidden md:block bg-white rounded-lg shadow overflow-x-auto">
  <table className="w-full text-sm">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-4 py-3 text-left">Tenant</th>
        <th className="px-4 py-3 text-left">Account Title</th>
        <th className="px-4 py-3 text-left">Bank</th>
        <th className="px-4 py-3 text-left">Paid Amount</th>
        <th className="px-4 py-3 text-left">Plan</th>
        <th className="px-4 py-3 text-left">Submitted</th>
        <th className="px-4 py-3 text-left">Status</th>
        <th className="px-4 py-3 text-right">Action</th>
      </tr>
    </thead>
    <tbody>
      {paymenttlist.map((pay) => (
        <tr key={pay.id} className="border-t hover:bg-gray-50">
          <td className="px-4 py-3 font-medium">{pay.tenantid}</td>
          <td className="px-4 py-3 font-medium">{pay.title}</td>
          <td className="px-4 py-3">{pay.bank}</td>
          <td className="px-4 py-3">{pay.amount}</td>
          <td className="px-4 py-3">{pay.planType}</td>
          <td className="px-4 py-3 text-gray-500">{pay.createdAt?`${new Date(pay.createdAt).getDate()}-${new Date(pay.createdAt).getMonth()+1}-${new Date(pay.createdAt).getFullYear()}`
      : "N/A"
    }</td>
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
              Open
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
<div className="md:hidden space-y-4">
  {paymenttlist.map((pay) => (
    <div
      key={pay.id}
      className="bg-white rounded-lg shadow p-4 space-y-2"
    >
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">{pay.tenantid}</h3>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[pay.status]}`}
        >
          {pay.status}
        </span>
      </div>

      <p className="text-sm text-gray-600">
        <span className="font-medium">Account Title:</span> {pay.title}
      </p>
 <p className="text-sm text-gray-600">
        <span className="font-medium">Plan:</span> {pay.planType}
      </p>
      <p className="text-sm text-gray-600">
        <span className="font-medium">Bank:</span> {pay.bank}
      </p>
       <p className="text-sm text-gray-600">
        <span className="font-medium">Paid Amount:</span> {pay.amount}
      </p>
      <p className="text-sm text-gray-500">
        <span className="font-medium">Submitted:</span> 
        {pay.createdAt?`${new Date(pay.createdAt).getDate()}-${new Date(pay.createdAt).getMonth()+1}-${new Date(pay.createdAt).getFullYear()}`
      : "N/A"
    }
      </p>

      <button
        onClick={() => setSelectedPayment(pay)}
        className="w-full mt-2 bg-blue-600 text-white py-2 rounded text-sm"
      >
        Open
      </button>
    </div>
  ))}
</div>
     {selectedPayment && (
  <div className="fixed inset-0 bg-black/40 z-50 flex items-end md:items-center justify-center">
    
    <div className="
      bg-white w-full md:max-w-lg
      rounded-t-2xl md:rounded-xl
      p-5 md:p-6
      space-y-4
      max-h-[90vh] overflow-y-auto
      animate-slideUp
    ">
      <div className="flex justify-between items-center">
        <h2 className="text-lg md:text-xl font-semibold">
          Review Payment
        </h2>

        <button
          onClick={() => setSelectedPayment(null)}
          className="text-gray-400 text-2xl leading-none"
        >
          ×
        </button>
      </div>

      {/* Image Preview */}
      <div className="rounded-lg border overflow-hidden">
        <img
          src={selectedPayment.screenshot}
          alt="Payment Proof"
          className="w-full max-h-[300px] object-contain bg-gray-50"
        />
      </div>
      {/* Update Fields */}
      <div className="space-y-3">
        <input
          placeholder="Trial,Monthly,Yearly"
          className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        onChange={(e)=>{setPlanType(e.target.value)}}
        />
        <input
          placeholder="Price"
          className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e)=>{setPrice(e.target.value)}}
        />
        <input
          type="date"
          className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e)=>{setExpiryDate(e.target.value)}}
        />
      </div>
      {messagee && (
        <div
          className={`mb-4 text-sm text-center rounded-lg px-4 py-2 border
            ${
              messageTypee === "success"
                ? "text-green-700 bg-green-50 border-green-200"
                : "text-red-700 bg-red-50 border-red-200"
            }`}
        >
          {message}
        </div>
      )}
      <div className="flex gap-3 pt-4">
        <button 
       onClick={() => {
  handleclick(selectedPayment.tenantid);
}}
        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm">
          Approve
        </button>
        <button   onClick={() => {
  handleclick1(selectedPayment.tenantid);
}}className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm">
          Reject
        </button>
      </div>

      {/* Close Button (Mobile Friendly) */}
      <button
        onClick={() => setSelectedPayment(null)}
        className="w-full text-sm text-gray-500 pt-1"
      >
        Close
      </button>
    </div>
  </div>
)}

    </div>
  );
}

export default SuperAdminPayments;
