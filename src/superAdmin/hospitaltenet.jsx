import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosinstance";
function SuperAdminTenants() {
  const [loading, setLoading] = useState(false);
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    const fetchTenants = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(
          "/users/getAllTnets",
          { withCredentials: true }
        );

        setTenants(res.data.data || []);
      } catch (err) {
        console.error(
          err.response?.data?.message || "Failed to fetch tenants"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTenants();
  }, []);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Hospital Tenants
        </h1>
        <p className="text-sm text-gray-500">
          Manage registered hospitals and subscriptions
        </p>
      </div>

      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <span className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* ===== Desktop Table ===== */}
      <div className="hidden md:block bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">Tenant ID</th>
              <th className="px-4 py-3 text-left">contact</th>
              <th className="px-4 py-3 text-left">Plan</th>
              <th className="px-4 py-3 text-left">Expiry</th>
              <th className="px-4 py-3 text-left">WhatsApp</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {tenants.map((tenant) => (
              <tr key={tenant._id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">
                  {tenant.tenantid}
                </td>
                <td className="px-4 py-3">
                  {tenant.contact}
                </td>
                <td className="px-4 py-3">
                  {tenant.planType}
                </td>
     <td
  className={`px-4 py-3 ${
    tenant.expiryDate && new Date(tenant.expiryDate) < new Date()
      ? "text-red-600 font-medium"
      : "text-gray-800"
  }`}
>
  {tenant.expiryDate
    ? new Date(tenant.expiryDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "-"}
</td>


                <td className="px-4 py-3">
  {tenant.whatsappEnabled ? "Yes" : "No"}
</td>

                <td className="px-4 py-3">
                  {tenant.subscriptionPrice}
                </td>
                <td className="px-4 py-3">
          <span
  className={`px-3 py-1 rounded-full text-xs font-medium ${
    tenant.status === "Active"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800"
  }`}
>
  {tenant.status}
</span>


                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== Mobile Cards ===== */}
      <div className="md:hidden space-y-4">
        {tenants.map((tenant) => (
          <div
            key={tenant._id}
            className="bg-white rounded-lg shadow p-4 space-y-2"
          >
            <div className="flex justify-between">
              <div>
                <p className="font-semibold">
                                    <b>Tenant id:</b>{tenant.tenantid}

                </p>
                <p className="text-sm text-gray-500">
                                   <b className="text-sm">contact:</b> {tenant.contact}

                </p>
              </div>
      <span
  className={`inline-flex items-center justify-center
    px-2 sm:px-3
    py-1
    text-[10px] sm:text-xs
    rounded-full font-medium
    whitespace-nowrap
    ${
      tenant.status?.toLowerCase() === "active"
        ? "bg-green-100 text-green-800"
        : "bg-red-100 text-red-800"
    }
  `}
>
  {tenant.status}
</span>
            </div>
            <p className="text-sm">
              <b>Plan:</b> {tenant.planType}
            </p>
            <p className="text-sm">
              <b>Expiry:</b> <td
  className={`px-4 py-3 ${
    tenant.expiryDate && new Date(tenant.expiryDate) < new Date()
      ? "text-red-600 font-medium"
      : "text-gray-800"
  }`}
>
  {tenant.expiryDate
    ? new Date(tenant.expiryDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "-"}
</td>

            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SuperAdminTenants;
