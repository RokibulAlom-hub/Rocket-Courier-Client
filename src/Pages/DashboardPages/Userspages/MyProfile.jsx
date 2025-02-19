import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useAxiospublic from "../../../Hooks/useAxiospublic";
import { useNavigate } from "react-router-dom";
import useRoleUser from "../../../Hooks/useRoleusers";
import { Sweetalert } from "../../../Hooks/UseSweetalerts/Sweetalert";
import { FaUser, FaEnvelope, FaFileImage, FaEdit } from "react-icons/fa";
import Heading from "../../Sharedcomponensts/Heading";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const MyProfilePage = () => {
  const axiosPublic = useAxiospublic();
  const { user, updateUserData } = useAuth();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [role, roleId] = useRoleUser();

  const onSubmit = async (data) => {
    try {
      const imageFile = { image: data.image[0] };
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: { "content-type": "multipart/form-data" },
      });
  
      const updateData = {
        displayName: data.name,
        photoURL: res.data.data.display_url,
      };
      const updateApi = {
        name: data.name,
        photoURL: res.data.data.display_url,
      };
  
      await updateUserData(updateData);
      const response = await axiosPublic.patch(`/update-user?roleId=${roleId}`, {updateApi});
      console.log(response.data);
  
      Sweetalert('Updated', "Successfully updated", "success");
      navigate('/dashboard/book-parcels');
    } catch (error) {
      console.error("Error updating profile:", error);
      Sweetalert('Errored', "Failed to update profile", "error");
    }
  };
  
  

  return (
    <div className="p-6 max-w-xl mx-auto bg-gray-50 shadow-lg rounded-lg font-sans">
      <Heading headtext="PRofile"></Heading>
      <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center flex items-center justify-center">
        <FaUser className="mr-2" />
        {user.displayName}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            <FaFileImage className="inline mr-2" />
            Choose Image File
          </label>
          <input
            type="file"
            {...register("image")}
            className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-yellow-50 file:text-yellow-600 hover:file:bg-yellow-100"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            <FaEdit className="inline mr-2" />
            Name
          </label>
          <input
            type="text"
            defaultValue={user.displayName}
            {...register("name")}
            className="input input-bordered w-full text-sm"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-2">
            <FaEnvelope className="inline mr-2" />
            Email
          </label>
          <input
            type="email"
            defaultValue={user.email}
            disabled
            className="input input-bordered w-full text-sm bg-gray-200 cursor-not-allowed"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2  bg-accent text-white transition duration-300"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default MyProfilePage;
