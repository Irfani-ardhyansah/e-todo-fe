import AdminLayout from "./layouts/AdminLayout";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md hover:shadow-lg transition rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Task</h2>
          <p className="text-3xl font-bold text-gray-900">10</p>
        </div>

        <div className="bg-white shadow-md hover:shadow-lg transition rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Users</h2>
          <p className="text-3xl font-bold text-gray-900">3</p>
        </div>
      </div>
    </AdminLayout>
  );
}
