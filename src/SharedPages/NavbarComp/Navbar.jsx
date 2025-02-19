import React, { useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import logo from "../../assets/icon.svg";
import "./Navabar.css";
import { AiOutlineMenu } from "react-icons/ai";
const Navbar = () => {
  const { user, userLogout } = useAuth();
  // destructuring user object
  const userData = { user };
  const dUser = userData.user;
  // console.log(dUser);
  const navigate = useNavigate();
  // this dropdown and toggle is for right side image and dashoboard route 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  // this dorpdown is for responsive menu design
  const [ismenuDropdownOpen, setIsmenuDropdownOpen] = useState(false);
  const menuDropdown = () => setIsmenuDropdownOpen(!ismenuDropdownOpen);
  const handleLogout = () => {
    userLogout().then((res) => {
      // console.log(res.user);
      navigate("/login");
    });
  };

  return (
    <div className="bg-backup w-full sticky top-0 z-50 shadow-2xl">
      <nav className="py-4 flex relative  justify-between items-center w-11/12 mx-auto">
        {/* Logo and Website Name and menu bar for responsive  */}
        <div className="flex items-center relative">
          <button onClick={menuDropdown} className=" md:hidden">
            <AiOutlineMenu />
          </button>
          {ismenuDropdownOpen && (
            <div className="absolute flex flex-col top-10 left-0 z-20 bg-white text-black rounded-lg shadow-lg p-4 w-48">
              <NavLink
                to="/"
                
              >
                Home
              </NavLink>
              <NavLink
                to="about"
                
              >
                About
              </NavLink>
              <NavLink
                to="contact"
                
              >
                Contact
              </NavLink>
              <button >
                <IoIosNotificationsOutline className="w-6 h-6" />
              </button>
            </div>
          )}
          <Link to="/" className="flex items-center gap-1">
            <img src={logo} alt="Logo" className="h-8 w-8" />
            <span className="text-lg uppercase font-bold">Rocket-Courier</span>
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="md:flex items-center hidden gap-4 uppercase">
          <NavLink to="/">Home</NavLink>
          <NavLink to="about">About</NavLink>
          <NavLink to="contact">Contact</NavLink>
          <button className="relative ">
            <span className="w-6 h-6">
              <IoIosNotificationsOutline />
            </span>
          </button>
        </div>
        <div>
          {/* Login or User Dropdown */}
          {user ? (
            <div className="relative">
              <img
                src={dUser.photoURL}
                alt="user image"
                className="h-10 w-10 rounded-full cursor-pointer"
                onClick={toggleDropdown}
              />
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 top-5 z-20 w-48 bg-white text-black rounded-lg shadow-lg">
                  <div className="px-4 py-2">
                    <p className="font-bold">{dUser.displayName}</p>
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
    </div>
  );
};

export default Navbar;
