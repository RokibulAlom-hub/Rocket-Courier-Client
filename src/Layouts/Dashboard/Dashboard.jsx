// Dashboard.jsx
import React from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "../../SharedPages/NavbarComp/Navbar";
import Footer from "../../SharedPages/FooterComp/Footer";

const Dashboard = () => {
    const userType = "Admin"
  return (
    <>
    <Navbar></Navbar>
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-4 text-center text-xl font-bold border-b border-gray-700">
          Dashboard
        </div>
        <ul className="menu p-4">
          {userType === "Admin" && (
            <>
              <li>
                <Link to="/dashboard/all-parcels">All Parcels</Link>
              </li>
              <li>
                <Link to="/dashboard/all-users">All Users</Link>
              </li>
              <li>
                <Link to="/dashboard/all-delivery-men">All Delivery Men</Link>
              </li>
              <li>
                <Link to="/dashboard/statistics">Statistics</Link>
              </li>
            </>
          )}

          {userType === "user" && (
            <>
              <li>
                <Link to="/dashboard/my-parcels">My Parcels</Link>
              </li>
              <li>
                <Link to="/dashboard/profile">My Profile</Link>
              </li>
            </>
          )}

          {userType === "Delivery-Men" && (
            <>
              <li>
                <Link to="/dashboard/delivery-tasks">Delivery Tasks</Link>
              </li>
              <li>
                <Link to="/dashboard/profile">My Profile</Link>
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
