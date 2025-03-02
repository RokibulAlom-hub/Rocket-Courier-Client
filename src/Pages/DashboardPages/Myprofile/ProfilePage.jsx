import React from "react";
import { Link } from "react-router-dom";
import useRoleUser from "../../../Hooks/useRoleusers";

const ProfilePage = () => {
  const [role, roleId, userData] = useRoleUser();
  console.log(userData);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-center mb-6">
          <img
            src={userData?.photoURL}
            alt="User Profile"
            className="w-32 h-32 rounded-full border-4 border-blue-500"
          />
        </div>
        <h1 className="text-3xl font-semibold text-center text-gray-800">
          {userData?.name}
        </h1>
        <p className="text-center text-gray-600 mt-2">
          All Informformation of Mine
        </p>

        <div className="mt-8">
          <h2 className="text-xl font-medium text-gray-700 border-b pb-2">
            Contact Information
          </h2>
          <div className="mt-4 space-y-4">
            <div className="flex items-center">
              <span className="w-32 font-medium text-gray-600">Email:</span>
              <span className="text-gray-800">{userData?.email}</span>
            </div>
            <div className="flex items-center">
              <span className="w-32 font-medium text-gray-600">Role:</span>
              <span className="text-gray-800">{userData?.role}</span>
            </div>
            <div className="flex items-center">
              <span className="w-32 font-medium text-gray-600">Phone:</span>
              <span className="text-gray-800">{userData?.phoneNumber}</span>
            </div>
          </div>
        </div>

        {/* <div className="mt-8 flex justify-center">
          <Link
            to="/dashboard/myprofile"
            className="px-6 py-2 bg-accent text-white rounded-lg  transition"
          >
            Update Profile
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default ProfilePage;
