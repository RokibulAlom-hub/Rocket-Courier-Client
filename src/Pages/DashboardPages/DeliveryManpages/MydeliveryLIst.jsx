import { useQuery } from "@tanstack/react-query";
import useAxiossecure, { axiosSecure } from "../../../Hooks/useAxiossecure";
import useRoleUser from "../../../Hooks/useRoleusers";
import { Sweetalert } from "../../../Hooks/UseSweetalerts/Sweetalert";

const MydeliveryLIst = () => {
  const axiosSecure = useAxiossecure();
  const [role, roleId] = useRoleUser();
  console.log(roleId, role);

  const {
    data: deliveryList,
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
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error fetching delivery list: {error.message}</div>;
  }
  console.log(deliveryList);

  const handleCancel = (id) => {
    console.log("this is parcel id for cancel", id);
    const cancelStatus = {
      status: "cancel",
    };
    const response = axiosSecure.patch(`/update-status/${id}`, cancelStatus);
    console.log(response.data);
    refetch()
    alert("parcel cancel");
  };

  const handleDeliver = async (id) => {
    console.log("this is parcel id for deliver", id);
    const deliverStatus = {
      status: "delivered",
    };
    const response = await axiosSecure.patch(`/update-status/${id}?dmanID=${roleId}`, deliverStatus);
    console.log(response.data);
    refetch();
     Sweetalert('Delivery Done','Successfully delivered','success')
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl text-center font-bold mb-4">My Delivery List</h1>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Booked User Name</th>
              <th>Receiver Name</th>
              <th>Booked User Phone</th>
              <th>Requested D. Date</th>
              <th>Approximate D. Date</th>
              <th>Receiver Phone</th>
              <th>Receiver Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through parcels to display only the ones assigned to the logged-in delivery man */}
            {deliveryList.map((parcel) => (
              <tr key={parcel._id}>
                <td>{parcel.name}</td>
                <td>{parcel.receiverName}</td>
                <td>{parcel.phone}</td>
                <td>{parcel.bookingDate}</td>
                <td>{parcel.App_delivery_date}</td>
                <td>{parcel.receiverPhone}</td>
                <td>{parcel.deliveryAddress}</td>
                <td>
                  {parcel.status === "delivered" ? (
                    "Completed"
                  ) : (
                    <>
                      {" "}
                      <button
                        onClick={() => handleCancel(parcel._id)}
                        className={`p-2 mb-2 rounded text-white bg-red-600`}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleDeliver(parcel._id)}
                        className={`p-2 rounded text-white bg-green-600`}
                      >
                        Deliver
                      </button>
                    </>
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

export default MydeliveryLIst;
