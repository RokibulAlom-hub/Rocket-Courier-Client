import React from "react";
import { useNavigate } from "react-router-dom";

const MyParcels = ({ parcels, updateParcelStatus }) => {
  const navigate = useNavigate();

  const handleCancel = (parcelId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );
    if (confirmCancel) {
      updateParcelStatus(parcelId, "canceled");
    }
  };

  const handleUpdate = (parcelId) => {
    navigate(`/update-booking/${parcelId}`);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Parcels</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Parcel Type</th>
              <th>Requested Delivery Date</th>
              <th>Approx. Delivery Date</th>
              <th>Booking Date</th>
              <th>Delivery Man ID</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel.id}>
                <td>{index + 1}</td>
                <td>{parcel.parcelType}</td>
                <td>{parcel.requestedDeliveryDate}</td>
                <td>{parcel.approxDeliveryDate || "TBD"}</td>
                <td>{new Date(parcel.bookingDate).toLocaleDateString()}</td>
                <td>{parcel.deliveryManId || "Unassigned"}</td>
                <td>{parcel.status}</td>
                <td>
                  {/* Update Button */}
                  <button
                    className={`btn btn-sm ${
                      parcel.status === "pending" ? "btn-primary" : "btn-disabled"
                    }`}
                    onClick={() => handleUpdate(parcel.id)}
                    disabled={parcel.status !== "pending"}
                  >
                    Update
                  </button>

                  {/* Cancel Button */}
                  <button
                    className={`btn btn-sm ${
                      parcel.status === "pending" ? "btn-error" : "btn-disabled"
                    } ml-2`}
                    onClick={() => handleCancel(parcel.id)}
                    disabled={parcel.status !== "pending"}
                  >
                    Cancel
                  </button>

                  {/* Review Button */}
                  {parcel.status === "delivered" && (
                    <button
                      className="btn btn-sm btn-success ml-2"
                      onClick={() => navigate(`/review/${parcel.id}`)}
                    >
                      Review
                    </button>
                  )}

                  {/* Pay Button */}
                  {parcel.status === "pending" && (
                    <button
                      className="btn btn-sm btn-warning ml-2"
                      onClick={() => navigate(`/payment/${parcel.id}`)}
                    >
                      Pay
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

export default MyParcels;
