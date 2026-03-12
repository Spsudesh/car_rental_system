import React, { use } from "react";
import { assets, dummyUserData } from "../../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const NavbarOwner = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex item-center justify-between px-6 md:px-10 py-4 text-gray-500 border-b border-borderColor relative transition-all">
      <Link to="/">
        <img src={assets.logo} alt="" className="h-7" />
      </Link>
      <div className="flex items-center gap-4">
        <p>Welcome, {user?.name || "Owner"} </p>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default NavbarOwner;
