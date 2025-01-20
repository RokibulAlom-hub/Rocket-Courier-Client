import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useAxiospublic from "../../../Hooks/useAxiospublic";
import { useNavigate } from "react-router-dom";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const MyProfile = () => {
  const axiosPublic = useAxiospublic();
  const { user, updateUserData } = useAuth();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate()
  const onSubmit = async (data) => {
    try {
      // Log form data for debugging
      console.log(data);

      // Prepare the image file for upload
      const imageFile = { image: data.image[0] };
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: { "content-type": "multipart/form-data" },
      });

      // Construct update data with displayName and photoURL
      const updateData = {
        displayName: data.name,
        photoURL: res.data.data.display_url,
      };

      // Call the updateUserData function
      await updateUserData(updateData);

      // Log success and provide user feedback
      console.log("Profile updated successfully:", updateData);
      alert("Profile updated successfully!");
      navigate('/dashboard/book-parcels')
    } catch (error) {
      // Log the error and handle it
      console.error("Error updating profile:", error.message);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">My Profile</h1>
      <h1 className="text-xl font-bold mb-4 text-center">{user.displayName}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            Choose Image File
          </label>
          <input
            type="file"
            {...register("image")}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-600 hover:file:bg-yellow-100"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            defaultValue={user.displayName}
            {...register("name")}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            defaultValue={user.email}
            disabled
            className="input input-bordered w-full"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default MyProfile;
