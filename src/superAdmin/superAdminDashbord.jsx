import React from "react";
import { Routes, Route } from "react-router-dom";
import SuperAdminTenants from "./hospitaltenet";
import SuperAdminPayments from "./payments";
import CreateTenant from "./createTenet";
import SuperAdminSidebar from "./SuperAdmin";
import AdminPaymentAccounts from "./AdminPaymentAccounts"
import Footer from "./footer";

function DashboardA() {
  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      <SuperAdminSidebar />

      <div className="flex flex-col flex-1">
        <main className="flex-1 overflow-y-auto p-6 pt-20 md:pt-6">
          <Routes>
            <Route index element={<CreateTenant />} />
            <Route path="tenants-list" element={<SuperAdminTenants />} />
            <Route path="payments" element={<SuperAdminPayments />} />
           <Route path="paymentAccounts" element={<AdminPaymentAccounts />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default DashboardA;
