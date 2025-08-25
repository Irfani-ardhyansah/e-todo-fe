import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

export default function AdminLayout({ children }) {
    return (
        <div className="flex h-screen bg-gray-100 text-gray-800">
            {/* Sidebar */}
            < AdminSidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Topbar */}
                < AdminTopbar />

                {/* Page Content */}
                <main className="flex-1 p-6 bg-gray-100">{children}</main>
            </div>
        </div>
    );
}
