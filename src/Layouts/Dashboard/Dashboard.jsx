// Dashboard.jsx
import React, { useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import useRoleUser from "../../Hooks/useRoleusers";
import { FcHome } from "react-icons/fc";

const Dashboard = () => {
  const navigate = useNavigate();
  const [role] = useRoleUser();
  console.log(role);
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
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 bg-accent text-white shadow-lg">
          <div className="p-4 text-center text-4xl font-semibold">
            Dashboard
          </div>
          <div className="divider"></div>

          <ul className="flex md:flex-col  text-bgcolor font-semibold md:p-2 gap-1 md:space-y-3">
            {/* if role is admin this dashboard links will be shown */}
            {role === "Admin" && (
              <>
                <NavLink to="/dashboard/statistics">📊 Statistics</NavLink>
                <NavLink to="/dashboard/all-parcels">📦 Parcels</NavLink>

                <NavLink to="/dashboard/all-users">👥 Users</NavLink>

                <NavLink to="/dashboard/all-delivery-men">
                  🚚 Delivery Men
                </NavLink>
              </>
            )}
            {/* if role is user this dashboard links will be shown */}
            {role === "user" && (
              <>
                <NavLink to="/dashboard/book-parcels">✉️ Book A Parcel</NavLink>

                <NavLink to="/dashboard/my-parcels">📬 My Parcels</NavLink>

                {/* <NavLink
                  to="/dashboard/myprofile"
                 
                >
                  🧑‍💼 My Profile
                </NavLink> */}
              </>
            )}
            {/* if role is delivery man this dashboard links will be shown */}
            {role === "Delivery-Men" && (
              <>
                <NavLink to="/dashboard/delivery-tasks">
                  📋 Delivery Tasks
                </NavLink>

                <NavLink to="/dashboard/profile">🛠️ My Reveiws</NavLink>

                {/* <NavLink
                  to="/dashboard/myprofile"
                 
                >
                   Update Profile
                </NavLink> */}
              </>
            )}
          </ul>
          <div className="divider"></div>
          <ul className="flex md:flex-col md:p-4 md:space-y-3 pb-4 gap-2">
            <NavLink to="/" className="flex items-center gap-1">
              <FcHome /> Home
            </NavLink>
            <NavLink
              to="/dashboard/profilePage"
              
            >
          🧑‍💼 My Profile
            </NavLink>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-bgcolor">
          <div className="p-4">
            {/* Nested Routes */}
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
