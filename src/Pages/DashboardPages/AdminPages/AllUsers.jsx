import useAllusers from "../../../Hooks/useAllusers";
import useAxiossecure from "../../../Hooks/useAxiossecure";
import { Sweetalert } from "../../../Hooks/UseSweetalerts/Sweetalert";

const AllUsers = () => {
  const axiosSecure = useAxiossecure();
  const [users, refetch, isLoading, error] = useAllusers();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-blue-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-lg font-medium">
        Error fetching users: {error.message}
      </div>
    );
  }

  const handleRoleChange = async (id, role) => {
    const response = await axiosSecure.patch(`/users/${id}`, { role });
    Sweetalert(`${role} Added`, `You made ${role}`, "success");
    refetch();
    return response.data;
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
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                }`}
              >
                <td className="py-3 px-4 font-medium">{index + 1}</td>
                <td className="py-3 px-4">{user.name}</td>
                <td className="py-3 px-4">{user.phoneNumber || "N/A"}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 rounded-full font-semibold ${
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
                <td className="py-3 px-4 space-x-2">
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
