import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAxiossecure from "../../../Hooks/useAxiossecure";
import useAuth from "../../../Hooks/useAuth";

const MyParcels = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [parcels, setParcel] = useState([]);
  const axiosSecure = useAxiossecure();
  useEffect(() => {
    axiosSecure.get(`/parcels?email=${user?.email}`).then((res) => {
      setParcel(res.data);
    });
  }, [user?.email]);
  // console.log(parcels);

  const handleCancel = (id) => {
    console.log("this is parcel id for cancel", id);
    const cancelStatus = {
      status: "cancel",
    };
    const response = axiosSecure.patch(`/update-status/${id}`, cancelStatus);
    console.log(response.data);
    alert("parcel cancel");
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
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td>{parcel.parcelType}</td>
                <td>{parcel.deliveryDate}</td>
                <td>{parcel.App_delivery_date || "TBD"}</td>
                <td>{parcel.bookingDate}</td>
                <td>{parcel.deliverymanId || "Unassigned"}</td>
                <td>{parcel.status}</td>
                <td className="flex flex-col justify-center gap-1">
                  {/* Update Button */}
                  <Link to={`/dashboard/update/parcel/${parcel._id}`}
                    className={`btn btn-sm ${
                      parcel.status === "pending"
                        ? "btn-primary"
                        : "btn-disabled"
                    }`}
                    disabled={parcel.status !== "pending"}

                  >
                    Update
                  </Link>

                  {/* Cancel Button */}
                  <button
                    className={`btn btn-sm ${
                      parcel.status === "pending" ? "btn-error" : "btn-disabled"
                    } ml-2`}
                    onClick={() => handleCancel(parcel._id)}
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
