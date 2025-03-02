import logos from "../../../../public/Logo.json";
import Heading from "../../Sharedcomponensts/Heading";
const Logo = () => {
  // console.log(logos);

  return (
    <div>
      <Heading headtext="Trusted BY"></Heading>
      <div className=" grid grid-cols-1  md:grid-cols-3  lg:grid-cols-4 gap-3  place-items-center ">
        {logos.map((l, id) => (
          <img
            className="w-52 rounded-lg h-40"
            key={id}
            src={l?.logo}
            alt="Logos"
          ></img>
        ))}
      </div>
    </div>
  );
};

export default Logo;
