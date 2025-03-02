import React from "react";
import Heading from "./Heading";

const Contact = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-6 lg:px-20">
        <Heading headtext=" Contact Us"></Heading>
        {/* Contact Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Left Section: Contact Details */}
          <div className="space-y-6">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold text-text mb-2">
                📍 Our Office
              </h3>
              <p className="">
                123 Rocket Avenue, Courier City, RC 45678
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold text-text mb-2">
                📞 Call Us
              </h3>
              <p className="">+1 (123) 456-7890</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h3 className="text-xl font-semibold text-text mb-2">
                ✉️ Email Us
              </h3>
              <p className="">support@rocketparcel.com</p>
            </div>
          </div>

          {/* Right Section: Contact Form */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <form className="space-y-4">
              <div>
                <label className="block  font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="block  font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="block  font-medium mb-2">
                  Message
                </label>
                <textarea
                  placeholder="Write your message here"
                  className="textarea textarea-bordered w-full"
                  rows="5"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4  bg-accent text-bgcolor rounded shadow  transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
