import useDeliveryman from "../../../Hooks/useDeliveryman";
import { useState } from "react";
import useAxiossecure from "../../../Hooks/useAxiossecure";
import useAllparcels from "../../../Hooks/useAllparcels";
import { Sweetalert } from "../../../Hooks/UseSweetalerts/Sweetalert";

const AllParcels = () => {
  const axiosSecure = useAxiossecure();
  const { deliveryMan } = useDeliveryman();
  const [appDate, setAppdate] = useState("");
  const [dMan, setDman] = useState(null);
  const [parcels, isLoading, error,refetch] = useAllparcels();
  const handleManage = async (id) => {
    // console.log(id, dMan, appDate);

    const updateMange = {
      appDate,
      dmanId: dMan._id,
      status: "On the Way",
    };
    // console.log(updateMange);

    const response = await axiosSecure.patch(
      `/manage-parcel/${id}`,
      updateMange
    );
    console.log(response.data);
    refetch()
    const modal = document.getElementById(`modal_${id}`);
    if (modal) {
      modal.close();
    }
     Sweetalert('Assign Man','Successfully Assign Delivery Man','success')
  };
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  

  if (error) {
    return <div>Error fetching parcels: {error.message}</div>;
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
                      document.getElementById(`modal_${parcel._id}`).showModal()
                    }
                  >
                    Manage
                  </button>
                  {/* modal */}
                  <dialog id={`modal_${parcel._id}`} className="modal">
                    <div className="modal-box">
                      <h1 className="text-2xl text-center font-bold mb-4">
                        Manage Parcel
                      </h1>
                      <h1>Select Delivery Man</h1>
                      <select
                        onChange={(e) => {
                          const selectMan = deliveryMan.find(
                            (dman) => dman.name === e.target.value
                          );
                          setDman({ _id: selectMan._id, name: selectMan.name });
                        }}
                        className="w-1/2 p-1 border rounded border-red-300"
                      >
                        <option value="">select delivery man</option>
                        {deliveryMan.map((dman) => (
                          <option key={dman?._id} value={dman?.name}>
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
                      <button
                        onClick={() => handleManage(parcel._id)}
                        className="bg-red-400 btn"
                      >
                        Assign
                      </button>
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
