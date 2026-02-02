import React from "react";

function Footer() {
  return (
   <footer className="mt-auto w-full py-3 text-center text-sm text-slate-500 flex flex-wrap items-center justify-center gap-4">
  
  {/* Copyright */}
  <span>© {new Date().getFullYear()}</span>

  {/* Website */}
  <a
    href="https://sysvon.com"
    target="_blank"
    rel="noopener noreferrer"
    className="font-medium text-slate-600 hover:text-blue-600 transition"
  >
    Sysvon Digital Solution
  </a>

  {/* Instagram */}
  <a
    href="https://www.instagram.com/sysvon.official?igsh=YXFiaHptaW0zcG9p"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-pink-500 transition flex items-center gap-1"
    aria-label="Instagram"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-4 h-4"
    >
      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5a4.25 4.25 0 0 0-4.25-4.25h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.25-.75a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Z" />
    </svg>
  </a>

  {/* ClinicoFlow Branding */}
  <div className="flex flex-col items-center leading-tight">
    <span className="font-semibold text-slate-600">
      ClinicoFlow
    </span>
    <span className="text-[10px] text-slate-400">
      Powered by Sysvon Digital Solution
    </span>
  </div>

</footer>
  );
}

export default Footer;
