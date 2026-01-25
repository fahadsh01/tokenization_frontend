import React from "react";

function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-slate-900 to-slate-800 text-slate-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          
          {/* Brand Credit */}
          <p className="text-sm text-center md:text-left">
            Built & Maintained by{" "}
            <a
              href="https://sysvon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white hover:text-blue-400 transition"
            >
              SysVON Digital Solutions
            </a>
          </p>

          {/* Copyright */}
          <p className="text-xs text-slate-400 text-center">
            © {new Date().getFullYear()} All rights reserved.
          </p>

          {/* System Info */}
          <p className="text-xs text-slate-400">
            Hospital Management System
          </p>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
