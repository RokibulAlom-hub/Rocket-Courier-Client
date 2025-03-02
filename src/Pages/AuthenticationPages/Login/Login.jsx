import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider/AuthProvider";
import SocialLogin from "../../../Hooks/SocialLogin";
import { Sweetalert } from "../../../Hooks/UseSweetalerts/Sweetalert";
import Heading from "../../Sharedcomponensts/Heading";

const Login = () => {
  const navigate = useNavigate();
  const { userLogin } = useContext(AuthContext);

  // React Hook Form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Prefill credentials
  const handlePrefill = (role) => {
    const credentials = {
      admin: { email: "rokibbhai@gmail.com", password: "0123456" },
      deliveryman: { email: "mahfuzbhai@gmail.com", password: "0123456" },
    };

    if (credentials[role]) {
      setValue("email", credentials[role].email);
      setValue("password", credentials[role].password);
    }
  };

  const onsubmit = (data) => {
    userLogin(data.email, data.password)
      .then((res) => {
        Sweetalert("Logged In", "Successfully Logged In", "success");
        navigate("/");
      })
      .catch((error) => {
        Sweetalert("Error", error.message, "error");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="shadow-lg rounded-lg p-8 w-full max-w-md">
        <Heading headtext="Login"></Heading>

        {/* Admin and Deliveryman Prefill Buttons */}
        <div className="flex justify-center items-center gap-4 mb-4">
          <h1 className="font-bold">Log in as a</h1>
          <button
            type="button"
            className="bg-accent text-white px-2 py-1 rounded-lg"
            onClick={() => handlePrefill("admin")}
          >
            Admin
          </button>
          <button
            type="button"
            className="bg-yellow-900 text-white px-2 py-1 rounded-lg"
            onClick={() => handlePrefill("deliveryman")}
          >
            Deliveryman
          </button>
        </div>

        <form onSubmit={handleSubmit(onsubmit)}>
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-accent text-white py-2 rounded-lg hover:bg-yellow-900 transition duration-300"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-red-500">
            Register
          </Link>
        </div>

        {/* Google Login Button */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 mb-2">Or</p>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
