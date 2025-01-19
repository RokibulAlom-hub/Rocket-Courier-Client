import React, { useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
  const { user, userLogout } = useAuth();
  console.log(user);
  
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const handleLogout = () => {
    userLogout().then((res) => {
      // console.log(res.user);
      navigate("/login");
    });
  };

  return (
    <nav className="border-b-2 bg-gradient-to-r from-blue-500 to-purple-600  border-orange-300 text-white px-4 py-3 flex justify-between items-center">
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
              src={user.photoURL}
              alt="Profile"
              className="h-10 w-10 rounded-full cursor-pointer"
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 z-20 w-48 bg-white text-black rounded-lg shadow-lg">
                <div className="px-4 py-2">
                  <p className="font-bold">{user.displayName}</p>
                </div>
                <hr />
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Dashboard
                </Link>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={handleLogout}
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
