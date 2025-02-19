
import useAllparcels from "../../../Hooks/useAllparcels";
import useAllusers from "../../../Hooks/useAllusers";
import Loading from "../../Sharedcomponensts/Loading";
import StatisCard from "./StatisCard";


const StatisticsCards = () => {
  const [parcels, isLoading, error] = useAllparcels();
  const [users,laoding,err] = useAllusers();

 

  if (isLoading || laoding) {
    return <Loading></Loading> 
  }

  // Filter the delivered parcels
  const deliverdParcels = parcels.filter(
    (parcel) => parcel.status === "delivered"
  );

  if (error || err) {
    return <div>Error fetching parcels: {error.message}</div>; // Show error message
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:gird-cols-4">
      {/* Total Parcels Booked */}
      <StatisCard headtext="Total Parcels Booked" numberHead={parcels.length}></StatisCard>
      <StatisCard headtext="Total Parcels Delivered" numberHead={deliverdParcels.length}></StatisCard>
      <StatisCard headtext="Total App Users" numberHead={users.length}></StatisCard>
      <StatisCard headtext="Years of Experience" numberHead="5"></StatisCard>
    </div>
  );
};

export default StatisticsCards;
