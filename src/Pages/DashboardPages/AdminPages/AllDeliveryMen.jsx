import useDeliveryman from "../../../Hooks/useDeliveryman";
import Heading from "../../Sharedcomponensts/Heading";

const AllDeliveryMen = () => {
  const { deliveryMan } = useDeliveryman();

  // Function to calculate average review
  const calculateReveiw = (reveiw) => {
    if (reveiw && reveiw?.length > 0) {
      const sum = reveiw.reduce((acc, curr) => acc + curr, 0);
      return Math.round(sum / reveiw.length);
    }
    return "N/A";
  };

  return (
    <div className="">
      <Heading headtext="All delivery man"></Heading>
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
        <table className="min-w-full bg-white text-center text-gray-700 border-collapse">
          <thead>
            <tr>
              <th className="py-3 px-6 border-b">Name</th>
              <th className="py-3 px-6 border-b">Phone Number</th>
              <th className="py-3 px-6 border-b">Parcels Delivered</th>
              <th className="py-3 px-6 border-b">Average Review</th>
            </tr>
          </thead>
          <tbody>
            {deliveryMan.map((dmans) => (
              <tr
                key={dmans._id}
                className={`${
                  dmans._id % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
                }`}
              >
                <td className="py-3 px-6 border">{dmans.name}</td>
                <td className="py-3 px-6 border">{dmans.phoneNumber}</td>
                <td className="py-3 px-6 border text-red-500 font-semibold">
                  {dmans.delivered}
                </td>
                <td className="py-3 px-6 border text-green-500 font-semibold">
                  {calculateReveiw(dmans.ratings)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllDeliveryMen;
