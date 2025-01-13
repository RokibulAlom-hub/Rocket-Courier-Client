import React from "react";
import bannerImg from "../../../assets/banner.jpg"
const Banner = () => {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center my-7"
      style={{
        backgroundImage: `url(${bannerImg})`, // Replace with your image URL
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative text-center text-white px-4">
        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Find Your Dream Destination
        </h1>

        {/* Search Bar */}
        <div className="flex items-center max-w-md mx-auto bg-white rounded-full overflow-hidden shadow-lg">
          <input
            type="text"
            placeholder="Search here..."
            className="flex-grow px-4 py-2 text-gray-800 outline-none"
          />
          <button className="bg-blue-500 text-white px-6 py-2 font-semibold hover:bg-blue-600">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
