import React from 'react';
import CountUp from 'react-countup';
import useAllparcels from '../../../Hooks/useAllparcels';
import useAllusers from '../../../Hooks/useAllusers';

const StatisticsCards = () => {
    const [parcels,isLoading,error] = useAllparcels()
    const [users] = useAllusers()
    // console.log(users);
    if (isLoading) {
        return <div>Loading...</div>; // Show loading indicator while fetching
      }
      // filter the delivey parcels
      const deliverdParcels = parcels.filter((parcel) => parcel.status === "delivered");
    
      if (error) {
        return <div>Error fetching parcels: {error.message}</div>; // Show error message
      }
  return (
    <div className="flex justify-around p-5">
      <div className="bg-gray-100 rounded-lg shadow-lg p-5 text-center w-1/4">
        <h3 className="mb-3 text-xl font-semibold">Total Number of Parcels Booked</h3>
        <CountUp className="text-2xl font-bold" end={parcels.length} duration={7} />
      </div>
      <div className="bg-gray-100 rounded-lg shadow-lg p-5 text-center w-1/4">
        <h3 className="mb-3 text-xl font-semibold">Total Number of Parcels Delivered</h3>
        <CountUp className="text-2xl font-bold" end={deliverdParcels.length} duration={7} />
      </div>
      <div className="bg-gray-100 rounded-lg shadow-lg p-5 text-center w-1/4">
        <h3 className="mb-3 text-xl font-semibold">Total Number of People Using Your App</h3>
        <CountUp className="text-2xl font-bold" end={users.length} duration={7} />
      </div>
    </div>
  );
};

export default StatisticsCards;
