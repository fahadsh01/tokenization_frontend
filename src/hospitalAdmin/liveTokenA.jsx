import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosinstance";

function LiveTokenPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [currentToken, setCurrentToken] = useState(null);
  const [nextToken, setNextToken] = useState(null);
  const [queueState, setQueueState] = useState("IDLE");
  const[button,setButton]=useState("")
  const fetchLiveToken = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await axiosInstance.get(
        "/appointment/liveToken",
        { withCredentials: true }
      );
       console.log(res)
      setCurrentToken(res.data.data.currentToken);
      setNextToken(res.data.data.nextToken);
      setButton(res.data.data.state);
      setQueueState(res.data.data.queueState);
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to fetch token");
    } finally {
      setLoading(false);
    }
  };
  const advanceToken = async () => {
    setLoading(true);
    try {
      const res =await axiosInstance.post(
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveToken();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow p-6 text-center">
        <h1 className="text-3xl font-bold mb-6">Live Token</h1>

        {loading && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <span className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        <p className="text-gray-500">Now Serving</p>
        <div className="text-7xl font-bold text-blue-600 mb-6">
          {currentToken ?? "--"}
        </div>

        <p className="text-gray-500">Next Token</p>
        <div className="text-3xl font-semibold mb-8">
          {nextToken ?? "--"}
        </div>

        <button
          onClick={advanceToken}
          className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-gray-800"
        >
         {button}
        </button>

        <p className="text-sm text-gray-500 mt-4">
          Queue Status:{" "}
          <span className="font-semibold">
            {queueState === "IN_PROGRESS" ? "Active" : "Idle"}
          </span>
        </p>

        {message && (
          <div className="mt-4 text-sm text-red-600">{message}</div>
        )}
      </div>
    </div>
  );
}

export default LiveTokenPage;
