import { Swiper, SwiperSlide } from "swiper/react";
import feedfile from "../../../../public/Feed.json";
// Import Swiper styles and modules
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import feedimg from "../../../assets/feedimage.jpg"
const Feedback = () => {
    return (
      <Swiper
      modules={[Navigation]} // Register Swiper modules
      // spaceBetween={}
      slidesPerView={1}
      // direction="vertical"
      navigation
      speed={1500}
      className="relative bg-cover bg-no-repeat bg-center my-20"
          style={{
            backgroundImage: `url(${feedimg})`,
            height: "60vh",
          }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      {feedfile.map((ban, key) => (
        <SwiperSlide
          key={key}
         
        >
          {/* Overlay */}
          <div className="relative text-backup flex flex-col items-center space-y-3 justify-center h-full">
             <img src={ban.image} alt=""  className="w-40 rounded-box"/>
             <p className="w-1/4 text-center">{ban.comments}</p>
             <div className="text-center">
              <h4>{ban.name}</h4>
              <h4>{ban.job}</h4>
             </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
    );
};

export default Feedback;
       