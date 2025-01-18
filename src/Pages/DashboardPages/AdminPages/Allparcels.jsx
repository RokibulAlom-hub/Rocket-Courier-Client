import { useQuery } from "@tanstack/react-query";
import useAxiospublic from "../../../Hooks/useAxiospublic";
import useDeliveryman from "../../../Hooks/useDeliveryman";
import { useState } from "react";

const AllParcels = () => {
  const axiosPublic = useAxiospublic();
  const {deliveryMan} = useDeliveryman();
  const [appDate,setAppdate] = useState('')
  const [dMan,setDman] =useState(null)
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
  const handleManage = (id,email) => {
    console.log(id,email,appDate,dMan);
    
  }
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
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td>{parcel.name}</td>
                <td>{parcel.phone}</td>
                <td>{parcel.bookingDate}</td>
                <td>{parcel.deliveryDate}</td>
                <td>{parcel.price} Tk</td>
                <td>{parcel.status}</td>
                <td>
                  <button
                    className="p-3 rounded text-white bg-violet-600"
                    onClick={() =>
                      document.getElementById(`modal_${parcel.id}`).showModal()
                    }
                  >
                    Manage
                  </button>
                  <dialog id={`modal_${parcel.id}`} className="modal">
                    <div className="modal-box">
                      <h1 className="text-2xl text-center font-bold mb-4">Manage Parcel</h1>
                      <h1>Select Delivery Man</h1>
                      <select onChange={(e) => setDman(e.target.value)} className="w-1/2 p-1 border rounded border-red-300">
                        {deliveryMan.map((dman) => (
                          <option key={dman?.name} value={dman?.name}>
                            {dman?.name}
                          </option>
                        ))}
                      </select>

                      <h1>Approximately Delivery Date</h1>
                      <input
                        type="date"
                        onChange={(e) => setAppdate(e.target.value)}
                        className="p-2 w-1/2 border border-red-700 rounded"
                      />
                      <button onClick={() => handleManage(parcel._id,parcel.email)} className="bg-red-400 btn">Assign</button>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllParcels;
