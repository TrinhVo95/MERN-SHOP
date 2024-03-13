import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="shadow-lg">
      {/* container */}
      <div className="max-w-screen-xl mx-auto px-4">
        {/* layout */}
        <div className="flex justify-between items-center py-6 h-navbar">
          {/* logo */}
          <Link to="/">
            <img src={Logo} alt="Nikee Logo" className="h-12 w-20" />
          </Link>
          {/* Admin button */}
          <Link to="/admin/products" className="btn">
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
