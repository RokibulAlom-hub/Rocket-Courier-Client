import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";

const Register = () => {
    const {createUserByemail,googlelogin} = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    
    createUserByemail(data?.email,data?.password)
    .then(result => {
        console.log(result.user);
        
    })
  };

  const handleGoogleRegister = () => {
    googlelogin()
    .then(result => {
        console.log(result.user);
        
    })
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* PhotoURL Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Photo URL</label>
            <input
              type="text"
              {...register("photoURL", { required: "Photo URL is required" })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />
            {errors.photoURL && (
              <p className="text-red-500 text-sm mt-1">{errors.photoURL.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Register
          </button>
          <div>Already Have an account <Link to="/login" className="text-red-500">Login</Link></div>
        </form>

        {/* Google Register Button */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 mb-2">Or</p>
          <button
            onClick={handleGoogleRegister}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Register with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
