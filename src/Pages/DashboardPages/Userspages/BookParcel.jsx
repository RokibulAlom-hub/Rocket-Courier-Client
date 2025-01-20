import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useAxiospublic from "../../../Hooks/useAxiospublic";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const BookParcel = () => {
  const axiosPublic = useAxiospublic();
  const navigate = useNavigate()
  const { user } = useAuth();
  const { register, handleSubmit, watch } = useForm();
  const parcelWeight = watch("parcelWeight");
  // const price = parcelWeight ? (parcelWeight <= 1 ? 50 : parcelWeight <= 2 ? 100 : 150) : 0;
  const price = parcelWeight
    ? parcelWeight <= 1
      ? 50
      : parcelWeight <= 2
      ? 100
      : 150
    : 0;
    console.log(user);
    
  const onSubmit = async (data) => {
    const bookingData = {
      ...data,
      bookingDate: format(new Date(), "dd/MM/yyyy"),
      price,
      email:user?.email,
      name:user?.displayName,
      status: "pending", 
    };
    try {
      const response = await axiosPublic.post(`/parcels`, bookingData);
      // console.log(response);
      alert("Booking added");
      navigate('/dashboard/my-parcels')
    } catch (error) {
      console.error("Error booking parcel:", error);
    }

    // console.log("Booking Data:", bookingData);

  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Book a Parcel</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            value={user.displayName}
            disabled
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            value={user.email}
            disabled
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            placeholder="Enter your phone number"
            {...register("phone")}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Parcel Type</label>
          <input
            type="text"
            placeholder="Enter parcel type"
            {...register("parcelType")}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Parcel Weight (kg)</label>
          <input
            type="number"
            step="0.1"
            placeholder="Enter parcel weight"
            {...register("parcelWeight")}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Receiver's Name</label>
          <input
            type="text"
            placeholder="Enter receiver's name"
            {...register("receiverName")}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Receiver's Phone Number
          </label>
          <input
            type="tel"
            placeholder="Enter receiver's phone number"
            {...register("receiverPhone")}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Delivery Address</label>
          <textarea
            placeholder="Enter delivery address"
            {...register("deliveryAddress")}
            className="textarea textarea-bordered w-full"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Requested Delivery Date
          </label>
          <input
            type="date"
            {...register("deliveryDate")}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Delivery Address Latitude
          </label>
          <input
            type="text"
            placeholder="Enter latitude"
            {...register("latitude")}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Delivery Address Longitude
          </label>
          <input
            type="text"
            placeholder="Enter longitude"
            {...register("longitude")}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Price</label>
          <input
            type="text"
            value={`Tk ${price}`}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Book Parcel
        </button>
      </form>
    </div>
  );
};

export default BookParcel;
