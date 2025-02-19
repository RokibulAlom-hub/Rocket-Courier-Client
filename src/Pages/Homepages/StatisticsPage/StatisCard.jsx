import CountUp from "react-countup";
import AOS from "aos";
import { useEffect } from "react";
const StatisCard = ({headtext,numberHead}) => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  return (
    <div
      className="bg-accent text-white border shadow-lg p-8 text-center "
      data-aos="fade-up"
    >
      <CountUp
        className="text-6xl font-bold"
        end={numberHead}
        duration={15}
      />
      <h3 className="mb-4">{headtext}</h3>
    </div>
  );
};

export default StatisCard;
