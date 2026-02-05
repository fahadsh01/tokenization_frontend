import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CreateAppointment from "./createAppiontment";
import AppointmentsList from "./allAppiontment";
import LiveTokenPage from "./liveTokenA";
import HospitalSidebar from "./adminNavigations";
import MadePayment from "./MadePayment"
import MyPayments from "./MyPayments"
import DoctorDashboard from "./DoctorDashboard";
import ProductOverview from "./Settings";
import Settings from "./sett";
import PublicNoticePage from "./PublicNoticePage";
import Footer from "./footer";

function Dashboard() {
  return (
      <div className="flex h-screen overflow-hidden bg-slate-100">
                <HospitalSidebar />

        <div className="flex flex-col flex-1">
                    <main className="flex-1 overflow-y-auto p-6 pt-20 md:pt-6">
            <Routes>
              <Route  index element={<CreateAppointment />} />
              <Route path="appointments-list" element={<AppointmentsList />} />
              <Route path="live-token" element={<LiveTokenPage />} />
              <Route path="madePayment" element={<MadePayment/>} />
              <Route path="myPayments" element={<MyPayments/>} />
              <Route path="summary" element={<DoctorDashboard/>} />
              <Route path="overview" element={<ProductOverview/>} />
              <Route path="settings" element={<Settings/>} />
              <Route path="notic-page" element={<PublicNoticePage/>} />



            </Routes>
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </div>
  );
}
export default Dashboard;
