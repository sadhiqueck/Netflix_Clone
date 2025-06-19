import { useState } from "react";
import { Bell, Search } from "lucide-react";

const Navbar = ({ userData }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);


  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("netflix-user");
    window.location.reload()
  };

  return (
    <nav className="fixed w-full z-50 bg-gradient-to-b from-black px-12 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-12">
          <h1 className="text-red-600 text-3xl font-bold">NETFLIX</h1>
          <div className="hidden md:flex gap-6">
            <a href="#" className="text-white text-sm font-light">
              Home
            </a>
            <a href="#" className="text-gray-300 text-sm font-light">
              Series
            </a>
            <a href="#" className="text-gray-300 text-sm font-light">
              Films
            </a>
            <a href="#" className="text-gray-300 text-sm font-light">
              New & Popular
            </a>
            <a href="#" className="text-gray-300 text-sm font-light">
              My List
            </a>
          </div>
        </div>
        <div className="flex items-center gap-6 relative">
          <Search className="w-5 h-5 text-white cursor-pointer" />
          <Bell className="w-5 h-5 text-white" />
          <div className="flex space-x-2 items-center relative">
            <img
              src={userData.avatar}
              alt="Avatar"
              className="w-6 cursor-pointer rounded"
              onClick={handleDropdownToggle}
            />
            <p
              className="cursor-pointer text-white"
              onClick={handleDropdownToggle}
            >
              {userData.name}
            </p>
            {dropdownOpen && (
              <div className="absolute right-0 top-8 mt-2 w-40 bg-zinc-800 rounded shadow-lg z-50">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 rounded cursor-pointer text-white hover:bg-zinc-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
