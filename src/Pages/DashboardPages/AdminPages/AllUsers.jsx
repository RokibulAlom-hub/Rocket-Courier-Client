import { useState } from "react";
import useAllusers from "../../../Hooks/useAllusers";
import useAxiossecure from "../../../Hooks/useAxiossecure";
import { Sweetalert } from "../../../Hooks/UseSweetalerts/Sweetalert";
import Swal from "sweetalert2";
const AllUsers = () => {
  const axiosSecure = useAxiossecure();
  const [users, laoding, err, refetch] = useAllusers();
  // const [roleChange,setRolechange] = useState('')
  if (laoding) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-blue-600">Loading...</div>
      </div>
    );
  }

  if (err) {
    return (
      <div className="text-center text-red-500 text-lg font-medium">
        Error fetching users: {error.message}
      </div>
    );
  }

  const handleRoleChange = (id, role) => {
    console.log(id, role);

    Swal.fire({
      title: ` Change the role to ${role}?`,
      showDenyButton: true,
      confirmButtonText: "Change",
      denyButtonText: `Don't Change`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axiosSecure.patch(`/users/${id}`, { role });
        Sweetalert(`${role} Added`, `You made ${role}`, "success");
        refetch();
        return response.data;
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <div className="p-6 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
        All Registered Users
      </h1>

      {/* User Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="table w-full text-center border-collapse border border-gray-300">
          <thead className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Phone Number</th>
              <th className="py-3 px-4">User Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          {/* user data coming from database  */}
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className={`${index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}`}
              >
                <td className="py-3 px-4 font-medium">{index + 1}</td>
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.phoneNumber || "N/A"}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full font-semibold ${
                      // conditon for user bg and text color
                      user.role === "Admin"
                        ? "bg-green-100 text-green-700"
                        : user.role === "Delivery-Men"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                {/* trying input field for better ui  */}
                <td>
                  <select
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="p-2 bg-slate-100"
                  >
                    <option value="">Change the role </option>
                    <option value="Admin">Admin</option>
                    <option value="Delivery-Men">Deliveryman</option>
                  </select>
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

{
  /* <td className="py-3 px-4 space-x-2">
{user.role !== "Admin" && (
  <button
    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
    onClick={() => handleRoleChange(user._id, "Admin")}
  >
    Make Admin
  </button>
)}
{user.role !== "Delivery-Men" && (
  <button
    className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
    onClick={() => handleRoleChange(user._id, "Delivery-Men")}
  >
    Make Delivery-Men
  </button>
)}
</td> */
}
