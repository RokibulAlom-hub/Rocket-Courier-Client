import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-text text-white py-8">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="flex flex-wrap justify-between items-start">
          {/* Company Info */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-3xl font-bold mb-3">Rocket-Courier</h2>
            <p className="text-gray-400">
              Delivering parcels with speed, precision, and care. Your trusted courier partner.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/">
                  Home
                </Link>
              </li>
              <li>
                <Link >
                  Services
                </Link>
              </li>
              <li>
                <Link>
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/contact">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/about">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
            <p className="text-gray-400 mb-3">
              Stay connected with us on social media for updates and offers.
            </p>
            <div className="flex space-x-4">
              <Link
                to="#"
                className="text-gray-400 text-xl"
              >
                <FaFacebook />
              </Link>
              <Link
                to="#"
                className="text-gray-400 text-xl"
              >
                <FaTwitter />
              </Link>
              <Link
                to="#"
                className="text-gray-400 text-xl"
              >
                <FaLinkedin />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-700 pt-4 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Rocket-Courier. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
``
