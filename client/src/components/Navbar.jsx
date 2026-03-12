import React, { useState } from"react";
import { assets, menuLinks } from"../assets/assets";
import { Link, useNavigate, useLocation } from"react-router-dom";
import { useAuth } from"../context/AuthContext";
import Logo from "./Logo";

const Navbar = ({ setShowLogin }) => {
 const location = useLocation();
 const [open, setOpen] = useState(false);
 const navigate = useNavigate();
 const { user, logout, isAuthenticated } = useAuth();

 return (
  <div
   className={` flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600 border-b border-borderColor relative transition-all ${
     location.pathname === "/" ? "bg-light" : "bg-white"
   }`}
  >
    <Link to="/">
      <Logo />
    </Link>

    <div
     className={`max-sm:fixed max-sm:h-screen max-sm:w-full max-sm:top-16 max-sm:border-t border-backgroundColor right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 max-sm:p-4 transition-all duration-300 z-50 ${
       location.pathname === "/" ? "bg-light" : "bg-white"
     } ${open ? "max-sm:translate-x-0" : "max-sm:-translate-x-full"}`}
    >
      {menuLinks.map((link, index) => (
       <Link key={index} to={link.path}>
         {link.name}
       </Link>
      ))}
      <div className="hidden lg:flex item-center text-sm gap-2 border border-borderColor rounded-full px-3 max-w-64">
        <input
          type="text"
          name="search"
          id=""
          className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
          placeholder="Search Products"
        />
        <img src={assets.search_icon} alt="search" />
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        {/* Show Dashboard link only for admin */}
        {user?.role === 'admin' && (
          <button onClick={() => navigate("/owner")} className="cursor-pointer">
            Dashboard
          </button>
        )}
        
        {isAuthenticated ? (
         <div className="flex items-center gap-4">
           <span className="text-sm">Hi, {user?.name}</span>
           <button
             onClick={logout}
             className="cursor-pointer px-8 py-2 bg-red-500 hover:bg-red-600 transition-all text-white rounded-lg"
           >
             Logout
           </button>
         </div>
        ) : (
         <button
           onClick={() => setShowLogin(true)}
           className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg"
         >
           {" "}
           Login
         </button>
        )}
      </div>
    </div>
    <button
     className="sm:hidden cursor-pointer"
     aria-label="Menu"
     onClick={() => setOpen(!open)}
    >
      <img src={open ? assets.close_icon: assets.menu_icon} alt="menu" />
    </button>
  </div>
 );
};

export default Navbar;
