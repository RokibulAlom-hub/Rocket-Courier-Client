import { Swiper, SwiperSlide } from "swiper/react";
import banfile from "../../../../public/banner.json";
// Import Swiper styles and modules
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
const Banner = () => {
  const {user} = useAuth()
  const navigate = useNavigate()
  // console.log(user);
   const handleBookbtn = () => {
      if(user === null){
        navigate ('/login')
      }
      else{
        navigate ('/dashboard')
      }
   }
  return (
    <Swiper
      modules={[Navigation, Autoplay]} // Register Swiper modules
      spaceBetween={50}
      slidesPerView={1}
      // direction="vertical"
      navigation
      speed={1500}
      autoplay={{
        delay: 2000, // Delay between slides in milliseconds
        disableOnInteraction: false, // Keep autoplay running after interaction
      }}
      className="bg-black"
      >
      {banfile.map((ban, key) => (
        <SwiperSlide
        key={key}
        className="relative bg-cover bg-no-repeat bg-center "
        style={{
          backgroundImage: `url(${ban.image})`,
          height: "90vh",
        }}
        >
          {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative text-backup flex flex-col items-center justify-center h-full">
            <h1 className="text-3xl md:text-6xl font-bold mb-3">{ban.heading}</h1>
            <p className="font-semibold w-2/4 text-center mb-2">
              {ban.description}
            </p>
            <Link onClick={handleBookbtn} className="bg-accent p-2 rounded-md hover:bg-yellow-900">
              Book A Parcel
            </Link >
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
