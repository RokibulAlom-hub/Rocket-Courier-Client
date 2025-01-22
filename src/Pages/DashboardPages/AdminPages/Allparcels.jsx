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
  const [parcels, isLoading, error, refetch] = useAllparcels();

  const handleManage = async (id) => {
    const updateMange = {
      appDate,
      dmanId: dMan._id,
      status: "On the Way",
    };
    const response = await axiosSecure.patch(
      `/manage-parcel/${id}`,
      updateMange
    );
    refetch();
    const modal = document.getElementById(`modal_${id}`);
    if (modal) {
      modal.close();
    }
    Sweetalert("Assign Man", "Successfully Assigned Delivery Man", "success");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching parcels: {error.message}</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-lg shadow-lg">
      <h1 className="text-3xl text-center font-bold mb-6 text-blue-600">
        All Parcels
      </h1>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="table w-full text-gray-700">
          <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
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
            {parcels.map((parcel, index) => (
              <tr key={parcel._id} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-50'}`}>
                <td>{index + 1}</td>
                <td>{parcel.name}</td>
                <td>{parcel.phone}</td>
                <td>{parcel.bookingDate}</td>
                <td>{parcel.deliveryDate}</td>
                <td>{parcel.price} Tk</td>
                <td>
                  <span
                    className={`py-1 px-3 rounded-full font-bold ${
                      parcel.status === "On the Way" ? "bg-green-500 text-white" : "bg-yellow-500 text-black"
                    }`}
                  >
                    {parcel.status}
                  </span>
                </td>
                <td>
                  <button
                    className="p-3 rounded-lg text-white bg-violet-600 hover:bg-violet-700 transition duration-300"
                    onClick={() =>
                      document.getElementById(`modal_${parcel._id}`).showModal()
                    }
                  >
                    Manage
                  </button>

                  {/* Modal */}
                  <dialog id={`modal_${parcel._id}`} className="modal">
                    <div className="modal-box">
                      <h2 className="text-2xl font-semibold text-center text-purple-600 mb-4">
                        Manage Parcel
                      </h2>
                      <h3>Select Delivery Man</h3>
                      <select
                        onChange={(e) => {
                          const selectedMan = deliveryMan.find(
                            (dman) => dman.name === e.target.value
                          );
                          setDman({ _id: selectedMan._id, name: selectedMan.name });
                        }}
                        className="w-1/2 p-2 border border-indigo-400 rounded-lg mb-4"
                      >
                        <option value="">Select Delivery Man</option>
                        {deliveryMan.map((dman) => (
                          <option key={dman._id} value={dman.name}>
                            {dman.name}
                          </option>
                        ))}
                      </select>

                      <h3>Approximate Delivery Date</h3>
                      <input
                        type="date"
                        onChange={(e) => setAppdate(e.target.value)}
                        className="p-2 w-1/2 border border-indigo-400 rounded-lg mb-4"
                      />

                      <button
                        onClick={() => handleManage(parcel._id)}
                        className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300"
                      >
                        Assign
                      </button>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                      <button>Close</button>
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
