import { useState } from "react";
import useAxiossecure from "../../../Hooks/useAxiossecure";
import { Sweetalert } from "../../../Hooks/UseSweetalerts/Sweetalert";
import Swal from "sweetalert2";
import Heading from "../../Sharedcomponensts/Heading";
import Loading from "../../Sharedcomponensts/Loading";
import { useQuery } from "@tanstack/react-query";

const AllUsers = () => {
  const axiosSecure = useAxiossecure();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerpage = 6;
  const {
    data,
    isLoading: laoding,
    error: err,
    refetch,
  } = useQuery({
    queryKey: ["allusers", currentPage],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/allusers?page=${currentPage}&size=${itemsPerpage}`
      );
      return response.data;
    },
  });
  const totalUser = data?.totalUser;
  const users = data?.result || [];
  // console.log(data);

  const numberofPages = Math.ceil(totalUser / itemsPerpage);
  const pages = [];
  for (let i = 0; i < numberofPages; i++) {
    pages.push(i);
  }
  // const pages = [...Array(numberofPages).keys()];
  console.log(pages);
  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < pages?.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  if (laoding) {
    return <Loading></Loading>;
  }

  if (err) {
    return (
      <div className="text-center text-red-500 text-lg font-medium">
        Error fetching users: {err.message}
      </div>
    );
  }

  const handleRoleChange = (id, role) => {
    Swal.fire({
      title: `Change the role to ${role}?`,
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
    <div className="p-4">
      <Heading headtext="All Registered Users"></Heading>

      {/* User Table */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="w-full text-center border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr className="space-y-3">
              <th>#</th>
              <th>Name</th>
              <th className=" hidden md:table-cell">Phone Number</th>
              <th>User Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className={`${index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"}`}
              >
                <td>{index + 1}</td>
                <td className="py-3 ">{user?.name}</td>
                <td className="py-3 hidden md:table-cell">
                  {user.phoneNumber || "N/A"}
                </td>
                <td className="py-3">
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
                <td className="py-3">
                  <select
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="p-2 bg-slate-100 rounded-lg"
                  >
                    <option value="">Change Role</option>
                    <option value="Admin">Admin</option>
                    <option value="Delivery-Men">Deliveryman</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* pages button */}
        <div className="font-semibold text-xl my-2 text-center space-x-2">
          <button onClick={handlePrev}>Prev</button>
          {pages.map((page) => (
            <button
              onClick={() => setCurrentPage(page)}
              className={
                currentPage === page
                  ? "bg-orange-400 px-1 rounded   text-white "
                  : "px-1 rounded bg-black  text-white"
              }
            >
              {page + 1}
            </button>
          ))}
          <button onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
