import { Link } from "react-router-dom"; 

export default function AdminSidebar() {
    return (
        <aside className="w-64 bg-gray-900 text-gray-100 flex flex-col">
            <div className="p-4 text-2xl font-bold border-b border-gray-700">
                Admin Panel
            </div>
            <nav className="flex-1 p-4 space-y-2">
                <a href="#" className="block p-2 rounded hover:bg-gray-800 hover:text-white transition no-underline text-white">
                    Task
                </a>
                <Link 
                    to="/admin/users" 
                    className="block p-2 rounded hover:bg-gray-800 hover:text-white transition no-underline text-white"
                >
                    User
                </Link>
            </nav>
            <div className="p-4 border-t border-gray-700">
                <button className="w-full bg-gray-700 mb-3 hover:bg-gray-600 p-2 rounded font-medium transition">
                    Logout
                </button>
            </div>
        </aside>
    );
}