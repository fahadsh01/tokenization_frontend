// pages/LiveTokenPage.jsx
import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosinstance";

function LiveTokenPage() {
  const [showPay, setShowPay] = useState(false);
const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [currentToken, setCurrentToken] = useState(null);
  const [nextToken, setNextToken] = useState(null);
  const [queueState, setQueueState] = useState("IDLE");
  const [button, setButton] = useState("");
  const [remainingTokens, setRemainingTokens] = useState([]);
    const [doneTokens, setDoneTokens] = useState([]);
  const [userSetting, setUserSetting] = useState(""); 
const [amount, setAmount] = useState("");


  const fetchLiveToken = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await axiosInstance.get("/appointment/liveToken", {
        withCredentials: true,
      });

      setCurrentToken(res.data.data.currentToken);
      setNextToken(res.data.data.nextToken);
      setButton(res.data.data.state);
      setQueueState(res.data.data.queueState);
      setRemainingTokens(res.data.data.waitingTokens || []);
      setDoneTokens(res.data.data.doneAndSkippedTokens || []);
      setUserSetting(res.data.data.setting || []);

    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to fetch appointments");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const advanceToken = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.post(
        "/appointment/advanceToken",
        {},
        { withCredentials: true }
      );
      setCurrentToken(res.data.data.currentToken);
      setNextToken(res.data.data.nextToken);
      setButton(res.data.data.state);
      setQueueState(res.data.data.queueState);
    } catch {
      setMessage("Failed to advance token");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const skipLiveToken = async () => {
    const confirmed = window.confirm("Do you really want to skip the token?");
    if (!confirmed) return;

    setLoading(true);
    try {
      await axiosInstance.patch(
        "/appointment/skipLiveToken",
        {},
        { withCredentials: true }
      );
      fetchLiveToken();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to skip token");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };
 const handlePay = async (amount,selectedId ) => {
setMessage(""),
setMessageType("")
    setLoading(true);
    try {
     const res = await axiosInstance.post(
        `/appointment/${selectedId}/addPatientPayment`,
        {amount},
        { withCredentials: true }
      );
      console.log(res)
      setMessage(res.data.message)
        setMessageType("success");
        setShowPay(false)
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to add payment");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchLiveToken();
  }, []);

  return (
    <div className="bg-gray-100 p-4 md:p-6 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Live Token</h1>
        <p className="text-sm text-gray-500">Real-time queue management</p>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`mb-4 text-sm text-center rounded-lg px-4 py-2 border ${
            messageType === "success"
              ? "text-green-700 bg-green-50 border-green-200"
              : "text-red-700 bg-red-50 border-red-200"
          }`}
        >
          {message}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <span className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[70vh]">
        {/* LEFT — Waiting (only BOTH) */}
        {userSetting === "BOTH" && (
          <div className="lg:col-span-3">
            <QueueCard title="Done" remainingTokens={doneTokens} setShowPay={setShowPay} setId={setSelectedId}/>
          </div>
        )}
{showPay && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    {/* Card */}
    <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 relative">
      
      {/* Close button */}
      <button
        onClick={() => setShowPay(false)}
        className="absolute px-2 top-3  right-3  rounded border text-white bg-red-500 hover:bg-red-600"
      >
        ✕
      </button>

      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-800 mb-1">
        Take Payment
      </h2>
      <p className="text-sm text-gray-500 mb-4">
        Enter the amount to confirm payment
      </p>

      {/* Form */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Amount
          </label>
          <input
            type="number"
            min="0"
            placeholder="PKR Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={() => {
              setShowPay(false);
              setAmount("");
            }}
            className="px-4 py-2 text-sm rounded-lg border text-white bg-red-500 hover:bg-red-600"
          >
            Cancel
          </button>

          <button
            onClick={() => handlePay(amount, selectedId)}
            disabled={!amount}
            className="px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            Confirm Payment
          </button>
        </div>
      </div>
    </div>
  </div>
)}

        {/* CENTER — Live Token */}
        <div
          className={
            userSetting === "NONE"
              ? "lg:col-span-12"
              : userSetting === "BOTH"
              ? "lg:col-span-6"
              : "lg:col-span-9"
          }
        >
          <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-center text-center h-full">
            <div className="mb-8">
              <p className="text-sm text-gray-500">Now Serving</p>
              <div className="text-7xl font-bold text-blue-600 mt-2">
                {currentToken ?? "--"}
              </div>
            </div>

            <div className="mb-8">
              <p className="text-sm text-gray-500">Next Token</p>
              <div className="text-3xl font-semibold text-gray-800">
                {nextToken ?? "--"}
              </div>
            </div>

            <div className="flex justify-center gap-3 mb-4">
              <button
                onClick={advanceToken}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700"
              >
                {button}
              </button>

              <button
                onClick={skipLiveToken}
                className="px-4 py-2 rounded-lg bg-yellow-500 text-white text-sm hover:bg-yellow-600"
              >
                Skip Token
              </button>
            </div>

            <p className="text-sm text-gray-500">
              Queue Status:{" "}
              <span className="font-medium">
                {queueState === "IN_PROGRESS" ? "Active" : "Idle"}
              </span>
            </p>
          </div>
        </div>

        {/* RIGHT — Done / Remaining Queue */}
        
        {(userSetting === "BEFORE" ||    
          userSetting === "BOTH") && (
          <div className="lg:col-span-3">
            <QueueCard
              title= "Remaining Queue"
              remainingTokens={remainingTokens} setShowPay={setShowPay} setId={setSelectedId}
            />
          </div>
        )}
        {( userSetting === "AFTER" ) && (
          <div className="lg:col-span-3">
            <QueueCard
              title= "Done"
              remainingTokens={doneTokens} setShowPay={setShowPay} setId={setSelectedId}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// Reusable Queue Card
function QueueCard({ title, remainingTokens, setShowPay, setId }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col h-full">
      <p className="text-sm text-gray-500 mb-3 text-center">{title}</p>

      <div className="flex-1 overflow-y-auto space-y-2">
        {remainingTokens.length === 0 ? (
          <p className="text-center text-gray-400 text-sm mt-10">
            No tokens
          </p>
        ) : (
          remainingTokens.map((item, index) => (
           <div
  key={item.tokenNumber}
  className="flex justify-between items-center px-3 py-2 bg-gray-50 rounded-lg"
>
  {/* Left: Token + Patient */}
  <div className="flex items-center gap-3">
    <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
      {item.tokenNumber}
    </div>

    <div>
      <span className="text-sm font-medium text-gray-800">
        {item.patientName}
      </span>
      <span className="block text-xs text-gray-400">
        Pos {index + 1}
      </span>
    </div>
  </div>

  {/* Right: Payment Status + Pay Button */}
  <div className="flex items-center gap-2">
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        item.payment.status === "PAID"
          ? "bg-gray-200 text-gray-600"
          : "bg-amber-400 text-white"
      }`}
    >
      {item.payment.status}
    </span>

  <button
  onClick={() => {
    setShowPay(true);
    setId(item._id);
  }}
  disabled={item.payment.status === "PAID"}
  className={`text-xs px-3 py-1 rounded-full font-medium transition ${
    item.payment.status === "PAID"
      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
      : "bg-green-500 text-white hover:bg-green-600"
  }`}
>
  {item.payment.status === "PAID" ? "Paid" : "Pay"}
</button>


  </div>
</div>

          ))
        )}
      </div>
    </div>
  );
}

export default LiveTokenPage;
