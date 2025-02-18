import React, { useEffect } from "react";
import CountUp from "react-countup";
import useAllparcels from "../../../Hooks/useAllparcels";
import useAllusers from "../../../Hooks/useAllusers";
import "aos/dist/aos.css";
import AOS from "aos";

const StatisticsCards = () => {
  const [parcels, isLoading, error] = useAllparcels();
  const [users,laoding,err] = useAllusers();

  useEffect(() => {
    AOS.init({ duration: 1000 }); 
  }, []);

  if (isLoading || laoding) {
    return <div>🍭 Loading sweet content... Hang tight! 🍭 </div>; 
  }

  // Filter the delivered parcels
  const deliverdParcels = parcels.filter(
    (parcel) => parcel.status === "delivered"
  );

  if (error || err) {
    return <div>Error fetching parcels: {error.message}</div>; // Show error message
  }

  return (
    <div className="flex flex-wrap justify-around gap-5">
      {/* Total Parcels Booked */}
      <div
        className="bg-text text-white rounded-lg shadow-lg p-8 text-center w-72"
        data-aos="fade-up"
      >
        <h3 className="mb-4 text-2xl font-semibold">Total Parcels Booked</h3>
        <CountUp
          className="text-4xl font-bold"
          end={parcels.length}
          duration={15}
        />
      </div>

      {/* Total Parcels Delivered */}
      <div
        className="bg-text text-white rounded-lg shadow-lg p-8 text-center w-72"
        data-aos="fade-up"
      >
        <h3 className="mb-4 text-2xl font-semibold">Total Parcels Delivered</h3>
        <CountUp
          className="text-4xl font-bold"
          end={deliverdParcels.length}
          duration={15}
        />
      </div>

      {/* Total Users */}
      <div
        className="bg-text text-white rounded-lg shadow-lg p-8 text-center w-72"
        data-aos="fade-up"
      >
        <h3 className="mb-4 text-2xl font-semibold">Total App Users</h3>
        <CountUp
          className="text-4xl font-bold"
          end={users.length}
          duration={15}
        />
      </div>
    </div>
  );
};

export default StatisticsCards;
