export default function AdminTopbar ()  {
    return (                
        <header className="bg-gray-800 text-gray-100 shadow p-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold"></h1>
            <div className="flex items-center space-x-4">
                <input
                    type="text"
                    placeholder="Search..."
                    className="px-3 py-1 rounded-lg bg-gray-700 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                <div className="bg-gray-700 px-3 py-1 rounded-full cursor-pointer hover:bg-gray-600 transition">
                    Admin
                </div>
            </div>
        </header>
    );
}