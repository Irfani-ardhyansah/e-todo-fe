import { useState } from "react";
import AdminLayout from "./layouts/AdminLayout";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

export default function Users() {
  // Dummy data awal
    const [users, setUsers] = useState([
        { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
        { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User" },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [newUser, setNewUser] = useState({ name: "", email: "", role: "" });

  // Handle Create User
    const handleCreate = () => {
        const id = users.length + 1;
        setUsers([...users, { id, ...newUser }]);
        setNewUser({ name: "", email: "", role: "" });
        setShowModal(false);
    };

    // Handle Delete
    const handleDelete = (id) => {
        console.log("Attempting to delete user with id:", id);
        toast.warning("Are you sure you want to delete this user?", {
            duration: 2000, // dalam ms
            action: {
            label: "Yes, delete",
            onClick: () => {
                // API call delete
                console.log("Deleted user:", id);
                toast.success("User deleted successfully!");
            },
            },
        });
    };

return (
    <AdminLayout>
        <div className="bg-gray-900 p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-100">Users</h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                    >
                    <Plus size={18} />
                </button>
            </div>

            <table className="w-full border-collapse">
                <thead>
                <tr className="bg-gray-800 text-gray-300">
                    <th className="px-4 py-2 text-left font-medium">No</th>
                    <th className="px-4 py-2 text-left font-medium">Name</th>
                    <th className="px-4 py-2 text-left font-medium">Email</th>
                    <th className="px-4 py-2 text-left font-medium">Action</th>
                </tr>
                </thead>
                <tbody>
                {[1, 2, 3].map((id) => (
                    <tr
                    key={id}
                    className="border-t border-gray-700 hover:bg-gray-800 transition"
                    >
                    <td className="px-4 py-2 text-gray-200">{id}</td>
                    <td className="px-4 py-2 text-gray-200">User {id}</td>
                    <td className="px-4 py-2 text-gray-200">user{id}@example.com</td>
                    <td className="px-4 py-2 space-x-2">
                        <button className="bg-yellow-500 hover:bg-yellow-400 text-black px-3 py-1 rounded-md text-sm">
                            <Pencil size={16} />
                        </button>
                        <button 
                            className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded-md text-sm"
                            onClick={() => handleDelete(id)}>
                            <Trash2 size={16} />
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-end mt-4 space-x-2">
                <button className="px-3 py-1 bg-gray-800 text-gray-400 rounded-md hover:bg-gray-700">
                Prev
                </button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded-md">1</button>
                <button className="px-3 py-1 bg-gray-800 text-gray-400 rounded-md hover:bg-gray-700">
                2
                </button>
                <button className="px-3 py-1 bg-gray-800 text-gray-400 rounded-md hover:bg-gray-700">
                Next
                </button>
            </div>
        </div>

        {/* Modal Create User */}
        <AnimatePresence>
        {showModal && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }} // animasi backdrop
        >
          <motion.div
            className="bg-gray-800 p-6 rounded-2xl shadow-lg w-96 relative"
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-gray-900 rounded-lg shadow-lg w-full max-w-md p-6 relative">
                <h2 className="text-xl font-bold text-white mb-4">Create User</h2>
                
                <form className="space-y-4">
                    <div>
                    <label className="block text-gray-300 mb-1">Email</label>
                    <input
                        type="email"
                        className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                        placeholder="Enter email"
                    />
                    </div>
                    <div>
                    <label className="block text-gray-300 mb-1">Nama</label>
                    <input
                        type="text"
                        className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                        placeholder="Enter name"
                    />
                    </div>
                    <div>
                    <label className="block text-gray-300 mb-1">Password</label>
                    <input
                        type="password"
                        className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                        placeholder="Enter password"
                    />
                    </div>
                    <div>
                    <label className="block text-gray-300 mb-1">Confirm Password</label>
                    <input
                        type="password"
                        className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                        placeholder="Confirm password"
                    />
                    </div>

                    <div className="flex justify-end space-x-2 mt-6">
                    <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        Save
                    </button>
                    </div>
                </form>

                {/* Close Button (X) */}
                <button
                    onClick={() => setShowModal(false)}
                    className="absolute top-3 right-3 text-gray-400 hover:text-white"
                >
                    ✕
                </button>
                </div>
            </div></motion.div></motion.div>
            )}
        </AnimatePresence>
    </AdminLayout>
  );
}
