import axios from "axios";

// Create an Axios instance
export const axiosSecure = axios.create({
  baseURL: "https://b10a12-server-side-rokibul-alom-hub.vercel.app", // Replace with your server URL
});

// Add an interceptor to the instance
axiosSecure.interceptors.request.use(
  (config) => {
    // Add token to the headers if it exists
    const token = localStorage.getItem("authToken");
    // console.log("Request intercepted with token:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Custom hook to use the axios instance
const useAxiossecure = () => {
  return axiosSecure; // Return the pre-configured Axios instance
};

export default useAxiossecure;
