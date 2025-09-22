import React, { useState, useEffect, useCallback, act } from 'react';
import AdminLayout from "./layouts/AdminLayout";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import useUserService from '../../services/useUserService';

export default function Users() {
    const { GetUser, DoPostUser, DoUpdateUser, DoDeleteUser } = useUserService();

    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({
            id: null,
            email: "",
            password: "",
            name: "",
            password_confirm: ""
        });
        
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        fetchUsers();
    }, [])

    // setShowModal(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const doPost = async () => {

        if(form.password != form.password_confirm) {
            alert("Password and Password Confirmation MisMatch!!")
        }

        if (!form.email || !form.name || !form.password) {
            console.error("Email, Name, Password Are Required!!");
            return;
        }

        const formData = new FormData();
        formData.append("email", form.email);
        formData.append("name", form.name);
        formData.append("password", form.password);

        try {
            let response = await DoPostUser(`/user`, formData);
            if(response.code == 200) { 
                toast.success("User inserted successfully!", {
                    duration: 2000, // dalam ms
                });
                fetchUsers();
                setForm({ id: null, title: "", description: "", password: "", password_confirm: "" });
                setShowModal(false);
            }
        } catch (err) {
            console.error(err.response?.data?.message)
        } finally {
            setShowModal(false)
        }
    }


    const doUpdate = async () => {
        if (!form.email || !form.name) {
            console.error("Email, Name, Are Required!!");
            return;
        }

        const formDataUpdate = new FormData();
        formDataUpdate.append("email", form.email);
        formDataUpdate.append("name", form.name);

        try {
            let response = await DoUpdateUser(`/user`,form.id, formDataUpdate);
            if(response.code == 200) { 
                toast.success("User inserted successfully!", {
                    duration: 2000, // dalam ms
                });
                fetchUsers();
                setForm({ id: null, title: "", description: "", password: "", password_confirm: "" });
                setShowModal(false);
            }
        } catch (err) {
            console.error(err.response?.data?.message)
        } finally {
            // setLoading(false);
            setShowModal(false)
        }
    }

    const doDelete = async (id) => {
        try {
            let response = await DoDeleteUser(`/user`, id);
            if(response.code == 200) { 
                toast.success("User Deleted successfully!", {
                    duration: 2000, // dalam ms
                });
                fetchUsers();
            }
        } catch (err) {
            console.error(err.response?.data?.message)
        } finally {
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(form.id) {
            doUpdate();
        } else {
            doPost();
        }
    };

    const handleDetail = (selectedItem) => {
        setForm({
            id: selectedItem.id,
            email: selectedItem.email,
            name: selectedItem.name
        });
        setShowModal(true);
    }
        
    const fetchUsers = async () => {
        try {
            const result = await GetUser('/users');
            if(result.code == 200) {
                setUsers(result.data);
            }
            // const updated = result.data.map((item) => ({ ...item, uuid: uuidv4() }));
        } catch(error) {
            // console.error('Failed to fetch task history:', error);
        }
    };

    const handleDelete = (id) => {
        toast.warning("Are you sure you want to delete this user?", {
            duration: 2000, // dalam ms
            action: {
            label: "Yes, delete",
            onClick: () => {
                // API call delete
                doDelete(id)
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
                {users.map((item) => (
                    <tr
                    key={item.id}
                    className="border-t border-gray-700 hover:bg-gray-800 transition"
                    >
                    <td className="px-4 py-2 text-gray-200">{item.id}</td>
                    <td className="px-4 py-2 text-gray-200">{item.name}</td>
                    <td className="px-4 py-2 text-gray-200">{item.email}</td>
                    <td className="px-4 py-2 space-x-2">
                        <button className="bg-yellow-500 hover:bg-yellow-400 text-black px-3 py-1 rounded-md text-sm"
                            onClick={() => {
                                    handleDetail(item);
                                }
                            }
                            >
                            <Pencil size={16} />
                        </button>
                        <button 
                            className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded-md text-sm"
                            onClick={() => handleDelete(item.id)}>
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
            exit={{ opacity: 0 }} 
        >
        <motion.div
            className="bg-gray-800 p-6 rounded-2xl shadow-lg w-96 relative"
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-gray-900 rounded-lg shadow-lg w-full max-w-md p-6 relative">
                <h2 className="text-xl font-bold text-white mb-4">Create User</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-300 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                            placeholder="Enter email"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-1">Nama</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                            placeholder="Enter name"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
                            placeholder="Enter password"
                        />
                    </div>
                    <div>
                    <label className="block text-gray-300 mb-1">Confirm Password</label>
                    <input
                        type="password"
                        name="password_confirm"
                        value={form.password_confirm}
                        onChange={handleChange}
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
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                            disabled={loading}
                        >
                            {form.id ? "Update" : "Create"}
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
