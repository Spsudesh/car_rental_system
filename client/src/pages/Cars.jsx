import React, { useState, useEffect } from"react";
import Title from"../components/Title";
import { assets } from"../assets/assets";
import CarCard from"../components/carCard";
import { useLocation } from "react-router-dom";
import { API_URL } from "../utils/api";

const Cars = () => {
 const [cars, setCars] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState("");
 const [input, setInput] = useState("");
 const [locationFilter, setLocationFilter] = useState("");
 const location = useLocation();

 // parse query params (location & date) on mount
 useEffect(() => {
   const params = new URLSearchParams(location.search);
   const loc = params.get("location") || "";
   if (loc) {
     setLocationFilter(loc);
     setInput(loc); // show location in search box
   }
   fetchCars(loc);
 }, [location.search]);

const fetchCars = async (searchTerm = "") => {
  try {
    setLoading(true);
    setError("");

    const query = encodeURIComponent(searchTerm || input);
    const response = await fetch(`${API_URL}/car/?search=${query}`);
    const data = await response.json();

    if (data.success) {
      let carList = data.cars || [];
      if (searchTerm) {
        carList = [...carList].sort((a, b) => {
          if (a.location === searchTerm && b.location !== searchTerm) return -1;
          if (a.location !== searchTerm && b.location === searchTerm) return 1;
          return 0;
        });
      }
      setCars(carList);
    } else {
      setError("Failed to fetch cars");
    }
  } catch (err) {
    setError("Network error. Please try again.");
  } finally {
    setLoading(false);
  }
};

const handleSearch = () => {
  // whenever user searches manually, keep location filter in effect
  fetchCars(locationFilter);
};

 return (
  <div className="flex flex-col items-center py-20 bg-light max-md:px-4">
    <Title
     title="Available Cars"
     subTitle="Browse our selection of premium vehicles available for your next adventure"
    />

    {locationFilter && (
      <p className="text-sm text-gray-600 mt-2">
        Cars in <span className="font-medium">{locationFilter}</span> are shown first.
      </p>
    )}

    {/* Search and Filter */}
    <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl mx-auto gap-4 mt-6">
      <div className="flex items-center bg-white px-4 w-full md:w-2/3 h-12 rounded-full shadow">
        <img
         src={assets.search_icon}
         alt="search"
         className="w-4.5 h-4.5 mr-2"
        />
        <input
         onChange={(e) => setInput(e.target.value)}
         onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
         type="text"
         value={input}
         placeholder="Search by make, model, or features"
         className="w-full h-full outline-none text-gray-500"
        />
        <button onClick={handleSearch}>
          <img
           src={assets.search_icon}
           alt="search"
           className="w-4.5 h-4.5 ml-2"
          />
        </button>
      </div>
    </div>
    
    {error && (
     <p className="text-red-500 mt-4">{error}</p>
    )}

    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10 w-full">
      <p className="text-gray-500 xl:px-20 max-w-7xl mx-auto">
       Showing {cars.length} Cars
      </p>
      
      {loading ? (
       <div className="flex justify-center items-center py-20">
         <p className="text-gray-500">Loading cars...</p>
       </div>
      ) : (
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 xl:px-20 max-w-7xl mx-auto">
         {cars.map((car, index) => (
          <CarCard key={index} car={car} currency="$" />
         ))}
       </div>
      )}
    </div>
  </div>
 );
};

export default Cars;
