import { Swiper, SwiperSlide } from "swiper/react";
import banfile from "../../../../public/banner.json";
// Import Swiper styles
import "swiper/css";
const Banner = () => {
  console.log(banfile);

  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      onSlideChange={() => console.log("slide change")}
      autoplay={{ delay: 2000 }}
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
          <div className="absolute inset-0 bg-black bg-opacity-70"></div>
          <div className="relative text-backup flex flex-col items-center justify-center  h-full" >
            <h1 className="text-6xl font-bold mb-3">{ban.heading}</h1>
            <p className="font-semibold w-2/4 text-center mb-2">{ban.description}</p>
            <button className="bg-accent p-2 rounded-md hover:bg-yellow-900">
            Book A Parcel
          </button>
          </div>
         
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
