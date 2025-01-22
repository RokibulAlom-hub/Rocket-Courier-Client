import { useQuery } from "@tanstack/react-query";
import useAxiossecure from "../../../Hooks/useAxiossecure";
import useRoleUser from "../../../Hooks/useRoleusers";
import { Sweetalert } from "../../../Hooks/UseSweetalerts/Sweetalert";
import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaTrashAlt,
  FaCheckCircle,
} from "react-icons/fa";

const MydeliveryLIst = () => {
  const axiosSecure = useAxiossecure();
  const [role, roleId] = useRoleUser();
  console.log(roleId, role);

  const {
    data: deliveryList = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["deliveryList"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/delivery-man-list/${roleId}`);
      return response.data; // Return the data here
    },
  });

  const handleCancel = async (id) => {
    if (window.confirm("Are you sure you want to cancel this parcel?")) {
      const cancelStatus = {
        status: "cancel",
      };
      const response = await axiosSecure.patch(
        `/update-status/${id}`,
        cancelStatus
      );
      console.log(response.data);
      refetch();
      alert("Parcel canceled");
    }
  };

  const handleDeliver = async (id) => {
    if (window.confirm("Confirm delivery of this parcel?")) {
      const deliverStatus = {
        status: "delivered",
      };
      const response = await axiosSecure.patch(
        `/update-status/${id}?dmanID=${roleId}`,
        deliverStatus
      );
      console.log(response.data);
      refetch();
      Sweetalert("Delivery Done", "Successfully delivered", "success");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        {/* Loader Spinner */}
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-600 mb-4">Error fetching delivery list.</p>
        <button
          onClick={refetch}
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-7xl mx-auto bg-gray-100 min-h-screen font-sans">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
        My Delivery List
      </h1>

      {deliveryList.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          No deliveries assigned yet.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto bg-white shadow rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-700 text-sm">
              <tr>
                <th className="px-3 py-2 text-left">
                  <FaUser className="inline mr-1" />
                  User Name
                </th>
                <th className="px-3 py-2 text-left">
                  <FaUser className="inline mr-1" />
                  Receiver Name
                </th>
                <th className="px-3 py-2 text-left">
                  <FaPhone className="inline mr-1" />
                  User Phone
                </th>
                <th className="px-3 py-2 text-left">
                  <FaCalendarAlt className="inline mr-1" />
                  Requested Date
                </th>
                <th className="px-3 py-2 text-left">
                  <FaCalendarAlt className="inline mr-1" />
                  Approx. Delivery Date
                </th>
                <th className="px-3 py-2 text-left">
                  <FaPhone className="inline mr-1" />
                  Receiver Phone
                </th>
                <th className="px-3 py-2 text-left">
                  <FaMapMarkerAlt className="inline mr-1" />
                  Receiver Address
                </th>
                <th className="px-3 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-600">
              {deliveryList.map((parcel, index) => (
                <tr
                  key={parcel._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100 transition duration-200`}
                >
                  <td className="px-3 py-2">{parcel.name}</td>
                  <td className="px-3 py-2">{parcel.receiverName}</td>
                  <td className="px-3 py-2">{parcel.phone}</td>
                  <td className="px-3 py-2">{parcel.bookingDate}</td>
                  <td className="px-3 py-2">{parcel.App_delivery_date}</td>
                  <td className="px-3 py-2">{parcel.receiverPhone}</td>
                  <td className="px-3 py-2">{parcel.deliveryAddress}</td>
                  <td className="px-3 py-2">
                    {parcel.status === "delivered" ? (
                      <span className="flex items-center text-green-600">
                        <FaCheckCircle className="mr-1" />
                        Completed
                      </span>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleCancel(parcel._id)}
                          title="Cancel"
                          className="text-red-600 hover:text-red-800"
                        >
                          <FaTrashAlt />
                        </button>
                        <button
                          onClick={() => handleDeliver(parcel._id)}
                          title="Deliver"
                          className="text-green-600 hover:text-green-800"
                        >
                          <FaCheckCircle />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MydeliveryLIst;
