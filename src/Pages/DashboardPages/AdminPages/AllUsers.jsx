import React, { useEffect, useState } from "react";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users data from the backend
    fetch(`https://b10a12-server-side-rokibul-alom-hub.vercel.app/allusers`) // Replace with your API URL
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  // console.log(users);
  
  const handleRoleChange = (id, role) => {
    // Send a request to the backend to update user role
    fetch(`https://b10a12-server-side-rokibul-alom-hub.vercel.app/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // Update the local state to reflect changes
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user._id === id ? { ...user, role } : user
            )
          );
        }
      });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Registered Users</h1>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Phone Number</th>
              <th>Parcels Booked</th>
              <th>User Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.phoneNumber || "N/A"}</td>
                <td>{user.parcelsBooked || 0}</td>
                <td className="bg-black rounded-lg text-white font-bold">{user.role}</td>
                <td>
                  {user.role !== "Admin" && (
                    <button
                      className="btn btn-sm btn-primary mr-2"
                      onClick={() => handleRoleChange(user._id, "Admin")}
                    >
                      Make Admin
                    </button>
                  )}
                  {user.role !== "Delivery-Men" && (
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={() => handleRoleChange(user._id, "Delivery-Men")}
                    >
                      Make Delivery-Men
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
