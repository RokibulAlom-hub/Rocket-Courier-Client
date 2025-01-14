import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider/AuthProvider";

const Login = () => {
    const {userLogin,googlelogin} = useContext(AuthContext)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    userLogin(data?.email,data?.password)
    .then(result => {
        console.log(result.user);
        
    })
  };

  const handleGoogleLogin = () => {
    googlelogin()
    .then(result => {
        console.log(result.user);
        
    })
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            Login
          </button>
        </form>
          <div>Dont have an account <Link to="/register" className="text-red-500">Register</Link></div>

        {/* Google Login Button */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 mb-2">Or</p>
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
