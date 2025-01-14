import React, { useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = null;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <nav className="border-b-2  border-orange-300 text-white px-4 py-3 flex justify-between items-center">
      {/* Logo and Website Name */}
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="Logo" className="h-8 w-8" />
        <span className="text-lg font-bold">Courier Bhai</span>
      </div>

      {/* Navigation Items */}
      <div className="flex items-center gap-4">
        <a href="/" className="hover:text-gray-300">
          Home
        </a>
        <button className="relative ">
          <span className="w-6 h-6">
            <IoIosNotificationsOutline />
          </span>
        </button>

        {/* Login or User Dropdown */}
        {user ? (
          <div className="relative">
            <img
              src={user.profilePicture}
              alt="Profile"
              className="h-10 w-10 rounded-full cursor-pointer"
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 z-20 w-48 bg-white text-black rounded-lg shadow-lg">
                <div className="px-4 py-2">
                  <p className="font-bold">{user.name}</p>
                </div>
                <hr />
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Dashboard
                </Link>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => console.log("Logged out")}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="login"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
