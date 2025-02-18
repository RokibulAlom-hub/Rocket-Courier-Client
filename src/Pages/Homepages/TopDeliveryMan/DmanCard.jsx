import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";
const DmanCard = ({man,id}) => {
    useEffect(() => {
        AOS.init({ duration: 1200 }); // Initialize AOS with a duration of 1.2 seconds
      }, []);
    return (
        <div
        key={man._id}
        className="bg-text text-white rounded-lg shadow-lg overflow-hidden  transition-transform transform hover:scale-105 hover:shadow-xl"
        data-aos={id % 2 === 0 ? "fade-right" : "fade-left"} // Alternating animations
      >
        <div className="relative">
          <img
            className="w-full h-48 object-cover"
            src={man.photoURL}
            alt={man.name}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        <div className="p-4 space-y-4">
          <h2 className="text-2xl font-semibold uppercase">{man.name}</h2>
          <p className="text-md  ">
            Parcels Delivered: <span className="font-bold">{man.delivered}</span>
          </p>
          <p className="text-md  ">
            Average Rating:{" "}
            <span className="font-bold">{Math.round(man.averageReveiw)}</span>
          </p>
        </div>
      </div>
    );
};

export default DmanCard;