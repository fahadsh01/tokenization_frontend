import React from "react";
function ProductOverview() {
  return (
    <div className="p-6 space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Token Management System
        </h1>
        <p className="text-gray-500 mt-1">
          A smart appointment & queue management solution by System Digital Solution
        </p>
      </div>

      {/* What Problem It Solves */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Why this system exists
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Hospitals and clinics often face overcrowding, long waiting times,
          and difficult manual record keeping. Patients are required to wait
          physically at the hospital for their turn, which causes discomfort,
          confusion, and poor experience.
        </p>
        <p className="text-gray-600 leading-relaxed mt-3">
          This system solves that problem by introducing a digital token-based
          appointment flow, allowing both hospitals and patients to manage time
          efficiently.
        </p>
      </section>

      {/* How It Works */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          How it works
        </h2>

        <ul className="space-y-3 text-gray-600">
          <li>
            • Receptionist books an appointment from the system.
          </li>
          <li>
            • Patient receives a token number and a tracking URL on WhatsApp.
          </li>
          <li>
            • The URL allows patients to view their live token status.
          </li>
          <li>
            • Receptionist updates tokens as patients are served.
          </li>
          <li>
            • Patients arrive at the hospital only when their token is near.
          </li>
        </ul>
      </section>

      {/* Benefits */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Benefits for hospitals & clinics
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
          <div>• Reduced crowding at clinics</div>
          <div>• Better patient flow management</div>
          <div>• No manual registers or paper records</div>
          <div>• Digital appointment & payment tracking</div>
          <div>• Daily summaries sent to doctors on WhatsApp</div>
          <div>• Improved patient experience</div>
        </div>
      </section>

      {/* Benefits for Patients */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Benefits for patients
        </h2>

        <ul className="space-y-3 text-gray-600">
          <li>• No need to wait physically at the hospital</li>
          <li>• Live token tracking from home</li>
          <li>• Better time planning</li>
          <li>• Less stress and crowd exposure</li>
        </ul>
      </section>

      {/* Subscription & Payment Notice */}
      <section className="bg-amber-50 border border-amber-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-amber-800 mb-3">
          Subscription & payment notice
        </h2>

        <p className="text-amber-800 leading-relaxed">
          Currently, the subscription payment system is manual and not online.
          Payments must be made manually and verified by our team.
        </p>

        <p className="text-amber-800 leading-relaxed mt-3">
          We strongly recommend making your payment at least
          <strong> 24 to 48 hours before expiry </strong>
          to avoid service interruption.
        </p>

        <p className="text-amber-800 leading-relaxed mt-3">
          If your subscription expires, system actions will be disabled until
          the payment is verified and the expiry is updated, which may take up
          to 24 hours.
        </p>
      </section>

      {/* Footer Note */}
      <section className="bg-white rounded-lg shadow p-6 text-center">
        <p className="text-gray-700 font-medium">
          Thank you for choosing System Digital Solution
        </p>
        <p className="text-gray-500 mt-2">
          We are committed to making healthcare management simple, efficient,
          and digital.
        </p>
      </section>
    </div>
  );
}

export default ProductOverview;
