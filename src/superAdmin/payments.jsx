import React from "react";

const payments = [
  {
    id: "PAY-001",
    tenantId: "HOSP-1001",
    hospital: "City Care Hospital",
    plan: "Premium",
    proofImage: "https://via.placeholder.com/150",
    submittedAt: "2025-01-05",
    status: "PENDING",
  },
  {
    id: "PAY-002",
    tenantId: "HOSP-1002",
    hospital: "LifeLine Clinic",
    plan: "Basic",
    proofImage: "https://via.placeholder.com/150",
    submittedAt: "2025-01-03",
    status: "APPROVED",
  },
];

const statusStyles = {
  PENDING: "bg-yellow-100 text-yellow-800",
  APPROVED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
};

function SuperAdminPayments() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Payment Renewals
        </h1>
        <p className="text-sm text-gray-500">
          Review subscription payments and update expiry
        </p>
      </div>

      {/* ===== Desktop Table ===== */}
      <div className="hidden md:block bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">Hospital</th>
              <th className="px-4 py-3 text-left">Tenant ID</th>
              <th className="px-4 py-3 text-left">Plan</th>
              <th className="px-4 py-3 text-left">Proof</th>
              <th className="px-4 py-3 text-left">Submitted</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((pay) => (
              <tr
                key={pay.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-4 py-3 font-medium">{pay.hospital}</td>
                <td className="px-4 py-3">{pay.tenantId}</td>
                <td className="px-4 py-3">{pay.plan}</td>

                <td className="px-4 py-3">
                  <img
                    src={pay.proofImage}
                    alt="Payment Proof"
                    className="w-16 h-16 rounded object-cover border cursor-pointer"
                  />
                </td>

                <td className="px-4 py-3 text-gray-500">
                  {pay.submittedAt}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[pay.status]}`}
                  >
                    {pay.status}
                  </span>
                </td>

                <td className="px-4 py-3 text-right space-x-2">
                  <button className="px-3 py-1 text-xs rounded bg-green-600 text-white hover:bg-green-700">
                    Approve
                  </button>
                  <button className="px-3 py-1 text-xs rounded bg-red-600 text-white hover:bg-red-700">
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== Mobile Cards ===== */}
      <div className="md:hidden space-y-4">
        {payments.map((pay) => (
          <div
            key={pay.id}
            className="bg-white rounded-lg shadow p-4 space-y-3"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {pay.hospital}
                </p>
                <p className="text-xs text-gray-500">{pay.tenantId}</p>
              </div>

              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[pay.status]}`}
              >
                {pay.status}
              </span>
            </div>

            <div className="flex gap-3 items-center">
              <img
                src={pay.proofImage}
                alt="Payment Proof"
                className="w-20 h-20 rounded object-cover border"
              />

              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <span className="font-medium">Plan:</span> {pay.plan}
                </p>
                <p>
                  <span className="font-medium">Submitted:</span>{" "}
                  {pay.submittedAt}
                </p>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button className="flex-1 px-3 py-2 text-xs rounded bg-green-600 text-white hover:bg-green-700">
                Approve
              </button>
              <button className="flex-1 px-3 py-2 text-xs rounded bg-red-600 text-white hover:bg-red-700">
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SuperAdminPayments;
