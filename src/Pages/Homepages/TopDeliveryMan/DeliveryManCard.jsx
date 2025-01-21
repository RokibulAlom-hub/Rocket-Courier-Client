import React from "react";
import useDeliveryman from "../../../Hooks/useDeliveryman";

const DeliveryManCard = () => {
  const { deliveryMan } = useDeliveryman();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {deliveryMan.map((man) => (
        <div key={man._id} className="bg-white rounded-lg shadow-md overflow-hidden m-4">
          <div className="relative">
            <img
              className="w-full h-48 object-cover"
              src={man.imageUrl}
              alt={man.name}
            />
          </div>
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800">{man.name}</h2>
            <p className="text-sm text-gray-600 mt-2">
              Parcels Delivered: <span className="font-medium">{man.delivered}</span>
            </p>
            <p className="text-sm text-gray-600 mt-2">
              Average Rating: <span className="font-medium">{man.rating}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DeliveryManCard;
