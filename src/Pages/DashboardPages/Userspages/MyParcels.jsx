import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAxiossecure from "../../../Hooks/useAxiossecure";
import useAuth from "../../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Sweetalert } from "../../../Hooks/UseSweetalerts/Sweetalert";
import Swal from "sweetalert2";
import Loading from "../../Sharedcomponensts/Loading";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiossecure();
  const [filter, setFilter] = useState("");
  const [dmanId, setDmanid] = useState("");
  const formattedDate = format(new Date(), "dd/MM/yyyy");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch user parcels
  const {
    data: myparcel,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["userParcel", filter],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/parcels?email=${user?.email}&filter=${filter}`
      );
      return response.data;
    },
  });

  if (isLoading) return <Loading />;
  if (error) return <div>Error fetching parcels: {error.message}</div>;

  // Handle parcel cancellation
  const handleCancel = (id) => {
    Swal.fire({
      title: "Want to cancel?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.patch(`/update-status/${id}`, { status: "cancel" });
        Sweetalert("Cancelled", "Successfully Canceled", "success");
        refetch();
      }
    });
  };

  // Handle review submission
  const onSubmit = async (data) => {
    await axiosSecure.post("/reviews", data);
    Sweetalert("Review Done", "Successfully added review", "success");
    reset();
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Parcels</h1>

      {/* Filter dropdown */}
      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded-lg"
        >
          <option value="">Filter By Status</option>
          <option value="delivered">Delivered</option>
          <option value="pending">Pending</option>
          <option value="On the Way">On the Way</option>
          <option value="cancel">Cancel</option>
        </select>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm md:text-base">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">#</th>
              <th className="p-2">Parcel Type</th>
              <th className="p-2 hidden md:table-cell">Requested Delivery Date</th>
              <th className="p-2 hidden md:table-cell">Approx. Delivery Date</th>
              <th className="p-2">Booking Date</th>
              <th className="p-2 hidden sm:table-cell">Delivery Man ID</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {myparcel.map((parcel, index) => (
              <tr
                key={parcel._id}
                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{parcel.parcelType}</td>
                <td className="p-2 hidden md:table-cell">{parcel.deliveryDate}</td>
                <td className="p-2 hidden md:table-cell">
                  {parcel.App_delivery_date || "TBD"}
                </td>
                <td className="p-2">{parcel.bookingDate}</td>
                <td className="p-2 hidden sm:table-cell">
                  {parcel?.deliverymanId || "Unassigned"}
                </td>
                <td className="p-2">
                  <span
                    className={`font-semibold ${
                      parcel.status === "delivered"
                        ? "text-green-500"
                        : parcel.status === "cancel"
                        ? "text-red-500"
                        : parcel.status === "On the Way"
                        ? "text-orange-500"
                        : "text-blue-500"
                    }`}
                  >
                    {parcel.status}
                  </span>
                </td>
                <td className="p-2 space-y-1">
                  {/* Update Button */}
                  <Link
                    to={`/dashboard/update/parcel/${parcel._id}`}
                    className={`btn btn-xs md:btn-sm ${
                      parcel.status === "pending" ? "btn-primary" : "btn-disabled"
                    }`}
                    disabled={parcel.status !== "pending"}
                  >
                    Update
                  </Link>

                  {/* Cancel Button */}
                  <button
                    className={`btn btn-xs md:btn-sm ${
                      parcel.status === "pending" ? "btn-error" : "btn-disabled"
                    }`}
                    onClick={() => handleCancel(parcel._id)}
                    disabled={parcel.status !== "pending"}
                  >
                    Cancel
                  </button>

                  {/* Review Button */}
                  {parcel.status === "delivered" && parcel.deliverymanId && (
                    <label
                      onClick={() => setDmanid(parcel.deliverymanId)}
                      htmlFor="review-modal"
                      className="btn btn-xs md:btn-sm btn-primary"
                    >
                      Review
                    </label>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Review Modal */}
      <input type="checkbox" id="review-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <label htmlFor="review-modal" className="btn btn-sm btn-circle absolute right-2 top-2">
            ✕
          </label>
          <h3 className="text-lg font-bold">Submit Your Review</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <input
              type="text"
              defaultValue={user.displayName}
              {...register("userName")}
              className="input input-bordered w-full"
              readOnly
            />
            <input
              type="text"
              defaultValue={user.photoURL}
              {...register("userImage")}
              className="input input-bordered w-full"
              readOnly
            />
            <input
              type="number"
              {...register("rating", { required: true, min: 1, max: 5 })}
              className="input input-bordered w-full"
              placeholder="Rating (1-5)"
              min="1"
              max="5"
            />
            <input
              type="text"
              defaultValue={formattedDate}
              {...register("reviewDate")}
              className="input input-bordered w-full"
              readOnly
            />
            <textarea
              {...register("feedback", { required: true })}
              className="textarea textarea-bordered w-full"
              placeholder="Feedback"
            />
            <input
              type="text"
              defaultValue={dmanId}
              {...register("dmanID", { required: true })}
              className="input input-bordered w-full"
              readOnly
            />
            <button type="submit" className="btn btn-primary w-full">
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyParcels;