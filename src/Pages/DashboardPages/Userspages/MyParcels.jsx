import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiossecure from "../../../Hooks/useAxiossecure";
import useAuth from "../../../Hooks/useAuth";
import { useForm } from "react-hook-form";

const MyParcels = () => {
  const [dmanId,setDmanid] = useState('')
  const { user } = useAuth();
  const [parcels, setParcel] = useState([]);
  const axiosSecure = useAxiossecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
  const onSubmit = async (data) => {
    console.log(data);
    const response = await axiosSecure.post('/reviews',data)
    alert('review creatd')
    return response.data
  };
  const handledId = (id) =>{
    setDmanid(id)
  }

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
                <td>{parcel?.deliverymanId || "Unassigned"}</td>
                <td>{parcel.status}</td>
                <td className="flex flex-col justify-center gap-1">
                  {/* Update Button */}
                  <Link
                    to={`/dashboard/update/parcel/${parcel._id}`}
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
                  {parcel.status === "delivered" && parcel.deliverymanId && (
                    <label onClick={() => handledId(parcel.deliverymanId)} htmlFor="review-modal" className="btn btn-primary">
                      Give Review
                    </label>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <div>
            {/* Modal */}
            <input type="checkbox" id="review-modal" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box relative">
                <label
                  htmlFor="review-modal"
                  className="btn btn-sm btn-circle absolute right-2 top-2"
                >
                  ✕
                </label>
                <h3 className="text-lg font-bold">Submit Your Review</h3>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mt-4 space-y-4"
                >
                  {/* User Name */}
                  <div>
                    <label className="label">
                      <span className="label-text">Your Name</span>
                    </label>
                    <input
                      type="text"
                      defaultValue={user.displayName}
                      {...register("userName")}
                      className="input input-bordered w-full"
                      readOnly
                    />
                  </div>

                  {/* User Image */}
                  <div>
                    <label className="label">
                      <span className="label-text">Your Image</span>
                    </label>
                    <input
                      type="text"
                      defaultValue={user.photoURL}
                      {...register("userImage")}
                      className="input input-bordered w-full"
                      readOnly
                    />
                  </div>

                  {/* Rating */}
                  <div>
                    <label className="label">
                      <span className="label-text">Rating (out of 5)</span>
                    </label>
                    <input
                      type="number"
                      {...register("rating", {
                        required: true,
                        min: 1,
                        max: 5,
                      })}
                      className="input input-bordered w-full"
                      min="1"
                      max="5"
                    />
                  </div>

                  {/* Feedback */}
                  <div>
                    <label className="label">
                      <span className="label-text">Feedback</span>
                    </label>
                    <textarea
                      {...register("feedback", { required: true })}
                      className="textarea textarea-bordered w-full"
                      placeholder="Write your feedback"
                    />
                  </div>

                  {/* Delivery Man's ID */}
                  <div>
                    <label className="label">
                      <span className="label-text">Delivery Man's ID</span>
                    </label>
                    <input
                      type="text"
                      defaultValue={dmanId}
                      {...register("dmanID", { required: true })}
                      className="input input-bordered w-full"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="modal-action">
                    <button type="submit" className="btn btn-primary">
                      Submit Review
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
