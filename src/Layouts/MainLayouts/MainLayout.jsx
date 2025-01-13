import { Outlet } from "react-router-dom";
import Navbar from "../../SharedPages/NavbarComp/Navbar";
import Footer from "../../SharedPages/FooterComp/Footer";

const MainLayout = () => {
    return (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600">
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;