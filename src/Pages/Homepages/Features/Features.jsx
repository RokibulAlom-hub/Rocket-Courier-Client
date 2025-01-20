import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaShieldAlt, FaShippingFast, FaThumbsUp } from "react-icons/fa";

const Features = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const features = [
    {
      icon: <FaShieldAlt size={40} className="text-blue-500" />,
      title: "Parcel Safety",
      description: "Your parcels are handled with the utmost care to ensure safe delivery every time.",
    },
    {
      icon: <FaShippingFast size={40} className="text-green-500" />,
      title: "Super Fast Delivery",
      description: "Experience blazing fast delivery speeds to get your parcels on time.",
    },
    {
      icon: <FaThumbsUp size={40} className="text-yellow-500" />,
      title: "Trusted Service",
      description: "Join thousands of satisfied customers who trust us for their delivery needs.",
    },
  ];

  return (
    <div className="py-12 bg-gradient-to-r from-blue-500 via-green-400 to-yellow-500">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Section Heading */}
        <h2
          className="text-3xl font-bold mb-6 text-white"
          data-aos="fade-down"
        >
          Our Features
        </h2>
        <p className="text-gray-100 mb-10" data-aos="fade-up">
          Discover the key features of our delivery system that set us apart.
        </p>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              data-aos="zoom-in"
              data-aos-delay={`${index * 100}`}
            >
              <div className="flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
