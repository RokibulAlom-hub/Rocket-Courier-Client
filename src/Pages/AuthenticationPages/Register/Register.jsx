import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import SocialLogin from "../../../Hooks/SocialLogin";
import useAxiospublic from "../../../Hooks/useAxiospublic";
import { Sweetalert } from "../../../Hooks/UseSweetalerts/Sweetalert";
import Heading from "../../Sharedcomponensts/Heading";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const Register = () => {
  const { createUserByemail, updateUserData } = useAuth();
  const axiosPublic = useAxiospublic();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const imageFile = { image: data.image[0] };
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: { "content-type": "multipart/form-data" },
      });

      const user = await createUserByemail(data?.email, data?.password);
      await updateUserData({
        displayName: data?.name,
        photoURL: res.data.data.display_url,
      });

      const userInfo = {
        email: data?.email,
        name: data?.name,
        photoURL: res.data.data.display_url,
        phoneNumber: data?.number,
        role: "user",

      };
      console.log(userInfo);

      const response = await axiosPublic.post(`/users`, userInfo);
      Sweetalert("Register", "Successfully Registered", "success");
      navigate("/");
      return console.log(response.data);
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className=" shadow-2xl rounded-lg p-8 w-full max-w-md">
        <Heading headtext="Sign Up"></Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name Field */}
          <div className="mb-4">
            <label className="block  mb-2">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 border rounded-lg bg-white"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          {/* phone number filed */}
          <div className="mb-4">
            <label className="block  mb-2">Phone Number</label>
            <input
              type="number"
              {...register("number", { required: "Number is required" })}
              className="w-full px-4 py-2 border rounded-lg bg-white"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* PhotoURL Field */}
          <div className="mb-4">
            <label className="block  mb-2">Upload Photo</label>
            <input
              type="file"
              {...register("image", { required: "Photo URL is required" })}
              className="w-full px-4 py-2 border rounded-lg bg-white"
            />
            {errors.photoURL && (
              <p className="text-red-500 text-sm mt-1">
                {errors.photoURL.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block  mb-2">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 border rounded-lg bg-white"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block  mb-2">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className="w-full px-4 py-2 border rounded-lg bg-white"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-accent text-white py-2 rounded-lg hover:bg-yellow-900 transition duration-300"
          >
            Register
          </button>
          <div>
            Already Have an account{" "}
            <Link to="/login" className="text-red-500">
              Login
            </Link>
          </div>
        </form>

        {/* Google Register Button */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 mb-2">Or</p>
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
};

export default Register;
