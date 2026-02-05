import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosinstance";
function PublicNoticePage() {
  const [message, setMessage] = useState("");
    const [messager, setMessager] = useState("");
        const [messageType, setMessageType] = useState("");
  const [loading,setLoading]= useState(false);
  const [type, setType] = useState("INFO");
  const[currentMessage,setCurrentMessage]=useState("")
  const handlePublish = async () => {
  if (!message.trim()) return;

  setLoading(true);

  try {
    const res = await axiosInstance.post(
      "/message/publish-message",
      { message, type },
      { withCredentials: true }
    );

    setMessager(res.data.message);
    setMessageType("success");
    fetchmsg()
        setMessage("");
  } catch (error) {
    setMessager(
      error.response?.data?.message || "Something went wrong"
    );
    setMessageType("error");
  } finally {
    setLoading(false);
  }
};
 const  fetchmsg= async () => {
  try {
    const res = await axiosInstance.get(
      "/message/fetchMessage",
      { withCredentials: true }
    );
    setCurrentMessage(res.data.data);
  } catch (error) {
   console.log("error")
  } 
};
  const handleRemove = async(id) => {
     try {
    const res = await axiosInstance.delete(
      `/message/${id}/deleteMessage`,
      { withCredentials: true }
    );
    console.log(res)
    setCurrentMessage("");
  } catch (error) {
    setMessager(
      error.response?.data?.message || "Something went wrong"
    );
    setMessageType("error");
  } 
  };
  useEffect(() => {
    fetchmsg();
  }, []);
  return (
  <div className="p-4 md:p-6">
  {/* Page Header */}
  <div className="mb-6">
    <h1 className="text-2xl font-semibold text-gray-800">
      Public Notice
    </h1>
    <p className="text-sm text-gray-500">
      Manage messages visible to patients
    </p>
  </div>

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {/* LEFT — Create Message */}
    <div className="bg-white rounded-xl shadow-md p-5 md:p-6">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            rows={4}
            placeholder="Type your notice here..."
            className="w-full rounded-lg border border-gray-300 px-4 py-2
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setMessage(e.target.value)}
         />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message Type
          </label>
          <select
            className="w-full rounded-lg border border-gray-300 px-4 py-2
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => setType(e.target.value)}

          >
           <option value="INFO">Info</option>
<option value="WARNING">Warning</option>
<option value="EMERGENCY">Emergency</option>

          </select>
        </div>
{messager && (
  <div
    className={`mt-4 text-sm text-center rounded-lg px-4 py-2 border
      ${
        messageType === "success"
          ? "text-green-700 bg-green-50 border-green-200"
          : "text-red-700 bg-red-50 border-red-200"
      }
    `}
  >
    {messager}
  </div>
)}    
        <button 
        onClick={handlePublish}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition">
          Publish Message
        </button>
      </div>
    </div>
<div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-center">
  <p className="text-sm text-gray-500 mb-2 text-center">
    Current Public Message
  </p>

  {/* Empty State */}
  {!currentMessage ? (
    <div className="text-center">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
        📢
      </div>
      <p className="text-sm text-gray-600">
        No public message is currently active.
      </p>
    </div>
  ) : (
    <div className="rounded-xl border border-blue-200 bg-blue-50 px-5 py-4 text-center">
      <p className="text-gray-800 font-medium">
        {currentMessage.message}
      </p>

      <div className="mt-4 flex items-center justify-center gap-4 text-sm">
        <span className="text-gray-500">
          Visible to patients
        </span>

        <button
          onClick={() => handleRemove(currentMessage._id)}
          className="text-red-600 font-medium hover:underline"
        >
          Remove
        </button>
      </div>
    </div>
  )}
</div>


  </div>
</div>

  );
}

export default PublicNoticePage;
