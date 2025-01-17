import { useQuery } from "@tanstack/react-query";
import useAxiospublic from "../../../Hooks/useAxiospublic";

const AllParcels = () => {
  const axiosPublic = useAxiospublic();

  // Using react-query to fetch all parcels
  const {
    data: parcels,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allparcels"],
    queryFn: async () => {
      const response = await axiosPublic.get("/allparcels");
      return response.data;
    },
  });
  console.log(parcels);
  
  if (isLoading) {
    return <div>Loading...</div>; // Show loading indicator while fetching
  }

  if (error) {
    return <div>Error fetching parcels: {error.message}</div>; // Show error message
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl text-center font-bold mb-4">ALL Parcels</h1>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>User's Name</th>
              <th>User's Phone</th>
              <th>Booking Date</th>
              <th>Requested Delivery Date</th>
              <th>Cost</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Map through parcels to create rows */}
            {parcels.map((parcel, index) => (
              <tr key={parcel.id}>
                <td>{index + 1}</td>
                <td>{parcel.userName}</td>
                <td>{parcel.phone}</td>
                <td>{parcel.bookingDate}</td>
                <td>{parcel.deliveryDate}</td>
                <td>{parcel.price} Tk</td>
                <td>{parcel.status}</td>
                <td>
                  <button className="btn btn-sm btn-primary">Manage</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        {/* Manage Modal */}
        {selectedParcel && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">
              Assign Delivery Man for Parcel #{selectedParcel.id}
            </h2>

            {/* Select Delivery Man */}
            <div className="mb-4">
              <label className="block mb-2 font-medium">Select Delivery Man:</label>
              <select
                className="form-select w-full"
                value={selectedDeliveryMan}
                onChange={(e) => setSelectedDeliveryMan(e.target.value)}
              >
                <option value="">Select Delivery Man</option>
                {deliveryMen.map((dm) => (
                  <option key={dm.id} value={dm.id}>
                    {dm.name} ({dm.phone})
                  </option>
                ))}
              </select>
            </div>

            {/* Approximate Delivery Date */}
            <div className="mb-4">
              <label className="block mb-2 font-medium">Approximate Delivery Date:</label>
              <input
                type="date"
                className="form-input w-full"
                value={approxDeliveryDate}
                onChange={(e) => setApproxDeliveryDate(e.target.value)}
              />
            </div>

            {/* Assign Button */}
            <div className="flex justify-end">
              <button
                className="btn btn-primary mr-2"
                onClick={handleAssign}
              >
                Assign
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setSelectedParcel(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllParcels;
