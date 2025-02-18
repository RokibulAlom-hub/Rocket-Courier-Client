import React, { useEffect } from "react";
import useDeliveryman from "../../../Hooks/useDeliveryman";
import "aos/dist/aos.css";
import AOS from "aos";

const DeliveryManCard = () => {
  const { deliveryMan } = useDeliveryman();
  const limitDeliveryMan = deliveryMan.slice(0, 3);

  useEffect(() => {
    AOS.init({ duration: 1200 }); // Initialize AOS with a duration of 1.2 seconds
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
      {limitDeliveryMan.map((man, index) => (
        <div
          key={man._id}
          className="bg-white rounded-lg shadow-lg overflow-hidden  transition-transform transform hover:scale-105 hover:shadow-xl"
          data-aos={index % 2 === 0 ? "fade-right" : "fade-left"} // Alternating animations
        >
          <div className="relative">
            <img
              className="w-full h-48 object-cover"
              src={man.photoURL}
              alt={man.name}
            />
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          </div>
          <div className="p-5">
            <h2 className="text-2xl font-semibold text-gray-800">{man.name}</h2>
            <p className="text-md text-gray-600 mt-2">
              Parcels Delivered: <span className="font-bold">{man.delivered}</span>
            </p>
            <p className="text-md text-gray-600 mt-2">
              Average Rating:{" "}
              <span className="font-bold">{Math.round(man.averageReveiw)}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DeliveryManCard;
