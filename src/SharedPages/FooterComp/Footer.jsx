import { FaFacebook, FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/4 text-center md:text-left mb-4 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">Courier Bhai</h2>
            <p>Delivering parcels with speed and precision.</p>
          </div>
          <div className="w-full md:w-1/2 mb-4 md:mb-0">
            <ul className="flex justify-center md:justify-between">
              <li><Link to="/" className="hover:text-yellow-300 px-2">Home</Link></li>
              <li><Link to="/services" className="hover:text-yellow-300 px-2">Services</Link></li>
              <li><Link to="/pricing" className="hover:text-yellow-300 px-2">Pricing</Link></li>
              <li><Link to="/contact" className="hover:text-yellow-300 px-2">Contact</Link></li>
              <li><Link to="/about" className="hover:text-yellow-300 px-2">About Us</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 text-center md:text-right">
            <div className="flex justify-center md:justify-end space-x-4">
              <Link to="#" className="hover:text-yellow-300"><FaFacebook></FaFacebook></Link>
              <Link to="#" className="hover:text-yellow-300"><FaTwitter></FaTwitter></Link>
              <Link to="#" className="hover:text-yellow-300"><FaLinkedin></FaLinkedin></Link>
            </div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p>&copy; 2025 YourCompany. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
