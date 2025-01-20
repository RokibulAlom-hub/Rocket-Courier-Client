import useAllusers from "../../../Hooks/useAllusers";
import useAxiossecure from "../../../Hooks/useAxiossecure";

const AllUsers = () => {
  const axiosSecure = useAxiossecure()
  const [users,refetch,isLoading,error] = useAllusers()
  if (isLoading) {
    return <div>Loading...</div>; // Show loading indicator while fetching
  }

  if (error) {
    return <div>Error fetching parcels: {error.message}</div>; // Show error message
  }
  const handleRoleChange =async (id, role) => {
    const response = await  axiosSecure.patch(`/users/${id}`,{role})
    refetch()
    return response.data
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
