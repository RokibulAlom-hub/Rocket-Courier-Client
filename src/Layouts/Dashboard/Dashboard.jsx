// Dashboard.jsx
import React, { useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import Navbar from "../../SharedPages/NavbarComp/Navbar";
import Footer from "../../SharedPages/FooterComp/Footer";
import useRoleUser from "../../Hooks/useRoleusers";

const Dashboard = () => {
  const navigate = useNavigate();
  const [role] = useRoleUser();
  useEffect(() => {
    if (role === "Admin") {
      navigate("/dashboard/statistics");
    }
    if (role === "user") {
      navigate("/dashboard/book-parcels");
    }
    if (role === "Delivery-Men") {
      navigate("/dashboard/delivery-tasks");
    }
  }, [role, navigate]);
  return (
    <>
      <Navbar></Navbar>
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <aside className="w-64 bg-gradient-to-b from-purple-500 via-indigo-500 to-blue-500 text-white shadow-lg">
          <div className="p-4 text-center text-2xl font-extrabold border-b border-indigo-400">
            Dashboard
          </div>
          <ul className="menu p-4 space-y-3">
            {/* if role is admin this dashboard links will be shown */}
            {role === "Admin" && (
              <>
                <li className="hover:bg-indigo-600 rounded-md">
                  <NavLink
                    to="/dashboard/statistics"
                    className="block px-4 py-2 rounded-md"
                  >
                    📊 Statistics
                  </NavLink>
                </li>
                <li className="hover:bg-indigo-600 rounded-md">
                  <NavLink
                    to="/dashboard/all-parcels"
                    className="block px-4 py-2 rounded-md"
                  >
                    📦 All Parcels
                  </NavLink>
                </li>
                <li className="hover:bg-indigo-600 rounded-md">
                  <NavLink
                    to="/dashboard/all-users"
                    className="block px-4 py-2 rounded-md"
                  >
                    👥 All Users
                  </NavLink>
                </li>
                <li className="hover:bg-indigo-600 rounded-md">
                  <NavLink
                    to="/dashboard/all-delivery-men"
                    className="block px-4 py-2 rounded-md"
                  >
                    🚚 All Delivery Men
                  </NavLink>
                </li>
              </>
            )}
            {/* if role is user this dashboard links will be shown */}
            {role === "user" && (
              <>
                <li className="hover:bg-indigo-600 rounded-md">
                  <NavLink
                    to="/dashboard/book-parcels"
                    className="block px-4 py-2 rounded-md"
                  >
                    ✉️ Book A Parcel
                  </NavLink>
                </li>
                <li className="hover:bg-indigo-600 rounded-md">
                  <NavLink
                    to="/dashboard/my-parcels"
                    className="block px-4 py-2 rounded-md"
                  >
                    📬 My Parcels
                  </NavLink>
                </li>
                <li className="hover:bg-indigo-600 rounded-md">
                  <NavLink
                    to="/dashboard/myprofile"
                    className="block px-4 py-2 rounded-md"
                  >
                    🧑‍💼 My Profile
                  </NavLink>
                </li>
              </>
            )}
            {/* if role is delivery man this dashboard links will be shown */}
            {role === "Delivery-Men" && (
              <>
                <li className="hover:bg-indigo-600 rounded-md">
                  <NavLink
                    to="/dashboard/delivery-tasks"
                    className="block px-4 py-2 rounded-md"
                  >
                    📋 Delivery Tasks
                  </NavLink>
                </li>
                <li className="hover:bg-indigo-600 rounded-md">
                  <NavLink
                    to="/dashboard/profile"
                    className="block px-4 py-2 rounded-md"
                  >
                    🧑‍💼 My Profile
                  </NavLink>
                </li>
                <li className="hover:bg-indigo-600 rounded-md">
                  <NavLink
                    to="/dashboard/myprofile"
                    className="block px-4 py-2 rounded-md"
                  >
                    🛠️ Update Profile
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-100">
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            {/* Nested Routes */}
            <Outlet />
          </div>
        </main>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Dashboard;
