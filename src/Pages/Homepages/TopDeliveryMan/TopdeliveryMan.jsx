import useDeliveryman from "../../../Hooks/useDeliveryman";
import Heading from "../../Sharedcomponensts/Heading";

import DmanCard from "./DmanCard";

const TopdeliveryMan = () => {
  const { deliveryMan } = useDeliveryman();
  const limitDeliveryMan = deliveryMan.slice(0, 3);

  return (
    <div>
      <Heading headtext="top 3 deliveymans of the month"></Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 ">
        {limitDeliveryMan.map((man, id) => (
          <DmanCard man={man} key={id}></DmanCard>
        ))}
      </div>
    </div>
  );
};

export default TopdeliveryMan;
