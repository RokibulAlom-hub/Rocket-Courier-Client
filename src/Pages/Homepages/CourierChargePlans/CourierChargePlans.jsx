import React from "react";
import Heading from "../../Sharedcomponensts/Heading";

const CourierChargePlans = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 shadow-lg rounded-lg font-sans">
      <Heading headtext="Courier Charge Plans"></Heading>

      {/* Service Type */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Select Service Type
        </h3>
        <ul className="list-disc list-inside text-gray-600">
          <li>Intercity outside</li>
          <li>Outside to Outside Delivery (Pickup & Delivery Different City)</li>
          <li>Samecity Delivery</li>
          <li> InsideSamecity (Pickup & Delivery Different Hubpoint in Samecity)</li>
        </ul>
      </div>

      {/* Pricing Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="p-3 border border-gray-300">Delivery Time</th>
              <th className="p-3 border border-gray-300">Up to 500 gm</th>
              <th className="p-3 border border-gray-300">500 gm to 1 Kilo</th>
              <th className="p-3 border border-gray-300">1 Kilo to 2 Kilo</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border border-gray-300">72 Hours</td>
              <td className="p-3 border border-gray-300">BDT 120</td>
              <td className="p-3 border border-gray-300">BDT 145</td>
              <td className="p-3 border border-gray-300">BDT 180</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td className="p-3 border border-gray-300">24 Hours</td>
              <td className="p-3 border border-gray-300">BDT 60</td>
              <td className="p-3 border border-gray-300">BDT 70</td>
              <td className="p-3 border border-gray-300">BDT 90</td>
            </tr>
          </tbody>
        </table>
      </div>
    

      {/* Conditions */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Conditions</h3>
        <ul className="list-disc list-inside text-gray-600">
          <li>1% COD charge will be applicable</li>
          <li>For weight more than 2KG, additional 25TK/Per KG will be applicable</li>
          <li>This price/plan is exclusive of any VAT/TAX</li>
        </ul>
      </div>
    </div>
  );
};

export default CourierChargePlans;
