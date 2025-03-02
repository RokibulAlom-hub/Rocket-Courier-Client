// Dashboard.jsx
import React, { useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import useRoleUser from "../../Hooks/useRoleusers";
import { FcHome } from "react-icons/fc";

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
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <aside className="w-64 bg-accent text-white shadow-lg">
          <div className="p-4 text-center text-4xl font-semibold">
            Dashboard
          </div>
          <div className="divider"></div>

          <ul className="menu text-bgcolor font-semibold p-4 space-y-3">
            {/* if role is admin this dashboard links will be shown */}
            {role === "Admin" && (
              <>
                <NavLink
                  to="/dashboard/statistics"
                  className="block   rounded-md"
                >
                  📊 Statistics
                </NavLink>
                <NavLink
                  to="/dashboard/all-parcels"
                  className="block   rounded-md"
                >
                  📦 Parcels
                </NavLink>

                <NavLink
                  to="/dashboard/all-users"
                  className="block   rounded-md"
                >
                  👥 Users
                </NavLink>

                <NavLink
                  to="/dashboard/all-delivery-men"
                  className="block   rounded-md"
                >
                  🚚 Delivery Men
                </NavLink>
              </>
            )}
            {/* if role is user this dashboard links will be shown */}
            {role === "user" && (
              <>
                <NavLink
                  to="/dashboard/book-parcels"
                  className="block   rounded-md"
                >
                  ✉️ Book A Parcel
                </NavLink>

                <NavLink
                  to="/dashboard/my-parcels"
                  className="block   rounded-md"
                >
                  📬 My Parcels
                </NavLink>

                {/* <NavLink
                  to="/dashboard/myprofile"
                  className="block   rounded-md"
                >
                  🧑‍💼 My Profile
                </NavLink> */}
              </>
            )}
            {/* if role is delivery man this dashboard links will be shown */}
            {role === "Delivery-Men" && (
              <>
                <NavLink
                  to="/dashboard/delivery-tasks"
                  className="block   rounded-md"
                >
                  📋 Delivery Tasks
                </NavLink>

                <NavLink to="/dashboard/profile" className="block   rounded-md">
                  🛠️ My Reveiws
                </NavLink>

                {/* <NavLink
                  to="/dashboard/myprofile"
                  className="block   rounded-md"
                >
                   Update Profile
                </NavLink> */}
              </>
            )}
          </ul>
          <div className="divider"></div>
          <ul className="menu p-4 space-y-3">
            <NavLink to="/" className="flex items-center gap-1">
              <FcHome /> Home
            </NavLink>
            <NavLink
              to="/dashboard/profilePage"
              className="flex items-center gap-1"
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
