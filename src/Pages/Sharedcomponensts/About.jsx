import abimg from "../../assets/feedimage.jpg"
const About = () => {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-6 lg:px-20">
        <h1 className="text-4xl font-bold text-center text-text mb-6">
          About Rocket Parcel
        </h1>
        <p className="text-lg text-gray-600 text-center mb-10">
          Delivering your packages with speed, efficiency, and care.
        </p>

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
            <h2 className="text-2xl font-semibold text-text mb-4">
              Who We Are
            </h2>
            <p className="text-gray-700 text-base leading-7 mb-4">
              Rocket Parcel is your trusted courier service, specializing in
              fast, secure, and reliable deliveries. Whether you need to send a
              small package or a large shipment, we ensure it reaches its
              destination safely and on time.
            </p>
            <h2 className="text-2xl font-semibold text-text mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 text-base leading-7">
              At Rocket Parcel, our mission is to make shipping easy and
              hassle-free. We combine advanced technology with exceptional
              customer service to create a seamless delivery experience for
              individuals and businesses alike.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center text-text mb-8">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold text-text mb-2">
                Speed
              </h3>
              <p className="text-gray-600 text-sm leading-6">
                With Rocket Parcel, your packages are delivered with the utmost
                speed, ensuring timely arrivals every time.
              </p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold text-text mb-2">
                Security
              </h3>
              <p className="text-gray-600 text-sm leading-6">
                We prioritize the safety and security of your packages,
                handling them with care throughout the journey.
              </p>
            </div>
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold text-text mb-2">
                Reliability
              </h3>
              <p className="text-gray-600 text-sm leading-6">
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
