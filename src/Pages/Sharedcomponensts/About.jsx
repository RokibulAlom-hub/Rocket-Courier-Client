import abimg from "../../assets/feedimage.jpg";
import Heading from "./Heading";
const About = () => {
  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Heading headtext="About Rocket Parcel"></Heading>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Section: Image */}
          <div className="flex justify-center">
            <img
              src={abimg}
              alt="Rocket Parcel Illustration"
              className="rounded-lg shadow-lg"
            />
          </div>

          {/* Right Section: Content */}
          <div>
            <h2 className="text-xl font-semibold text-text mb-4">
              Who We Are
            </h2>
            <p className="text-gray-700 text-base  mb-4">
              Rocket Parcel is your trusted courier service, specializing in
              fast, secure, and reliable deliveries. Whether you need to send a
              small package or a large shipment, we ensure it reaches its
              destination safely and on time.
            </p>
            <h2 className="text-xl font-semibold text-text mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 text-base ">
              At Rocket Parcel, our mission is to make shipping easy and
              hassle-free. We combine advanced technology with exceptional
              customer service to create a seamless delivery experience for
              individuals and businesses alike.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-8">
          <Heading headtext="Our Core Values"></Heading>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold text-text mb-2">Speed</h3>
              <p className=" text-sm">
                With Rocket Parcel, your packages are delivered with the utmost
                speed, ensuring timely arrivals every time.
              </p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold text-text mb-2">Security</h3>
              <p className=" text-sm">
                We prioritize the safety and security of your packages, handling
                them with care throughout the journey.
              </p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold text-text mb-2">
                Reliability
              </h3>
              <p className=" text-sm">
                You can count on us for consistent, dependable service that
                meets your needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
