// Dashboard.jsx
import React, { useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import Navbar from "../../SharedPages/NavbarComp/Navbar";
import Footer from "../../SharedPages/FooterComp/Footer";
import useRoleUser from "../../Hooks/useRoleusers";

const Dashboard = () => {
  const navigate = useNavigate()
    const [role] = useRoleUser()
    useEffect(() => {
        if (role === "Admin" ) {
          navigate("/dashboard/all-parcels")
        }
        if (role === "user") {
          navigate("/dashboard/book-parcels")
        }
        if (role === "Delivery-Men") {
          navigate("/dashboard/delivery-tasks")
        }
    },[role,navigate])
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
          {role === "Admin" && (
            <>
              <li>
                <NavLink to="/dashboard/all-parcels">All Parcels</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/all-users">All Users</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/all-delivery-men">All Delivery Men</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/statistics">Statistics</NavLink>
              </li>
            </>
          )}

          {role === "user" && (
            <>
              <li>
                <NavLink to="/dashboard/book-parcels">Book A Parcel</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/my-parcels">My Parcels</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myprofile">My Profile</NavLink>
              </li>
            </>
          )}

          {role === "Delivery-Men" && (
            <>
              <li>
                <NavLink to="/dashboard/delivery-tasks">Delivery Tasks</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/profile">My Profile</NavLink>
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
