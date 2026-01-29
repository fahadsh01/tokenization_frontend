import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "./socket";
import axiosInstance from "./axiosinstance";

function PublicTokenScreen() {
  const { tenantId } = useParams();
  const [currentToken, setCurrentToken] = useState(null);
  const [nextToken, setNextToken] = useState(null);
  const [hospital, setHospital] = useState(null);
  const [message, setMessage] = useState("");
  const [lang, setLang] = useState("en");
  const [blink, setBlink] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());

  const prevTokenRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("/notification.wav");
  }, []);

  useEffect(() => {
    if (!tenantId) return;

    const fetchInitialToken = async () => {
      try {
        const res = await axiosInstance.get(
          `/appointment/${tenantId}/publicLiveToken`,
          { withCredentials: true }
        );
        const data = res.data.data;
        setCurrentToken(data.currentToken ?? null);
        setNextToken(data.nextToken ?? null);
        setHospital(data.hospital ?? null);
        setMessage(getMessageFromState(data.state, lang));
        prevTokenRef.current = data.currentToken ?? null;
      } catch (err) {
        console.error("Initial token fetch failed", err);
        setMessage(
          lang === "en"
            ? "Unable to load token information"
            : "ٹوکن کی معلومات حاصل نہیں ہو سکیں"
        );
      }
    };

    fetchInitialToken();
  }, [tenantId, lang]);

  useEffect(() => {
    if (!tenantId) return;

    socket.emit("join-hospital", tenantId);
    socket.on("token:update", (data) => {
      const newToken = data.currentToken ?? null;
      if (prevTokenRef.current !== null && prevTokenRef.current !== newToken) {
        audioRef.current?.play().catch(() => {});
        setBlink(true);
        setTimeout(() => setBlink(false), 800);
      }
      prevTokenRef.current = newToken;
      setCurrentToken(newToken);
      setNextToken(data.nextToken ?? null);
      if (data.state) setMessage(getMessageFromState(data.state, lang));
    });

    return () => socket.off("token:update");
  }, [tenantId, lang]);

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
<div className="min-h-screen flex flex-col items-center justify-start bg-slate-100 text-slate-800 px-4 py-6 sm:py-10 space-y-4">

  {/* Header */}
  <div className="w-full max-w-4xl flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white shadow-md rounded-xl px-4 py-3">
    <div className="flex flex-col">
      <h2 className="text-xl sm:text-2xl font-bold">{hospital ?? "Hospital"}</h2>
      <p className="text-sm sm:text-base text-slate-500">{hospital?.department ?? "Token Display"}</p>
    </div>
    <p className="mt-2 sm:mt-0 text-sm sm:text-base font-mono font-semibold text-slate-700">
      {dateTime.toLocaleDateString()} • {dateTime.toLocaleTimeString()}
    </p>
  </div>

  {/* Language Toggle */}
  <button
    onClick={() => setLang(lang === "en" ? "ur" : "en")}
    className="self-end px-3 sm:px-4 py-2 sm:py-2 rounded-lg bg-white shadow text-sm sm:text-base font-medium"
  >
    {lang === "en" ? "اردو" : "English"}
  </button>

  {/* Title */}
  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center">
    🏥 {text[lang].title}
  </h1>

  {/* Message */}
  {message && (
    <div className="px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-center w-full max-w-3xl text-base sm:text-lg font-semibold">
      {message}
    </div>
  )}

  {/* Current Token */}
  <div className="bg-white shadow rounded-lg px-4 sm:px-6 py-6 sm:py-8 w-full max-w-sm text-center">
    <p className="text-base sm:text-lg font-bold text-gray-500">{text[lang].nowServing}</p>
    <div
      className={`font-extrabold text-emerald-600 mt-2 ${blink ? "scale-110 animate-pulse" : ""}`}
      style={{ fontSize: "clamp(3rem, 10vw, 6rem)" }} // bigger on small screens
    >
      {currentToken ?? "--"}
    </div>
  </div>

  {/* Next Token */}
  <div className="bg-white shadow rounded-lg px-4 sm:px-6 py-4 sm:py-6 w-full max-w-sm text-center">
    <p className="text-base sm:text-lg font-bold text-gray-500">{text[lang].nextToken}</p>
    <div className="text-2xl sm:text-3xl font-bold text-amber-500 mt-1">{nextToken ?? "--"}</div>
  </div>

  {/* Please Wait */}
  <div className="bg-amber-100 px-4 sm:px-6 py-3 sm:py-4 rounded-lg w-full max-w-sm text-center">
    <p className="text-base sm:text-lg font-bold text-amber-800">{text[lang].pleaseWait}</p>
    <p className="text-sm sm:text-base font-semibold text-amber-700 mt-1">{text[lang].reachOnTime}</p>
  </div>
</div>


  );
}

/* State → Message Mapper */
const getMessageFromState = (state, lang) => {
  const messages = {
    en: {
      STARTED: "Token service has started",
      ADVANCED: "Please proceed to the counter",
      QUEUE_EMPTY: "All tokens are completed for today",
      NO_APPOINTMENTS: "No appointments available",
    },
    ur: {
      STARTED: "ٹوکن سروس شروع ہو گئی ہے",
      ADVANCED: "براہ کرم کاؤنٹر پر تشریف لائیں",
      QUEUE_EMPTY: "آج کے تمام ٹوکن مکمل ہو گئے",
      NO_APPOINTMENTS: "کوئی اپائنٹمنٹ موجود نہیں",
    },
  };
  return messages[lang]?.[state] ?? "";
};

/* Static Text */
const text = {
  en: {
    title: "Public Token Display",
    nowServing: "Now Serving",
    nextToken: "Next Token",
    pleaseWait: "You have to wait for your turn.",
    reachOnTime: "Arrive on time. Late arrivals will have to wait or may be skipped.",
  },
  ur: {
    title: "ٹوکن اسٹیٹس",
    nowServing: "جاری ٹوکن",
    nextToken: "اگلا ٹوکن",
    pleaseWait: "آپ کو اپنی باری کا انتظار کرنا ہوگا۔",
    reachOnTime:
      "وقت پر پہنچیں۔ دیر سے آنے والوں کو انتظار کرنا پڑے گا یا ان کا ٹوکن چھوڑا جا سکتا ہے۔",
  },
};

export default PublicTokenScreen;
