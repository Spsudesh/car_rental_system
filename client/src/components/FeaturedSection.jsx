import React, { useState, useEffect } from "react";
import Title from "./Title";
import { assets } from "../assets/assets";
import CarCard from "./carCard";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/api";

const FeaturedSection = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedCars();
  }, []);

  const fetchFeaturedCars = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/car/`);
      const data = await response.json();
      
      if (data.success) {
        // Get first 6 available cars
        setCars(data.cars.slice(0, 6));
      }
    } catch (error) {
      console.error("Error fetching featured cars:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center py-24 px-6  md:px-16 lg:px-24 xl:px-32">
      <div>
        <Title
          title="Featured Vehicles"
          subTitle="Explore our selection of premimum vehicles available for your next advanture."
        />
      </div>
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <p className="text-gray-500">Loading cars...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
          {cars.map((car) => (
            <div key={car._id}>
              <CarCard car={car} />
            </div>
          ))}
        </div>
      )}
      <button
        onClick={() => {
          navigate("/cars");
          scrollTo(0, 0);
        }}
        className="flex items-center justify-center gap-2 px-6 py-2 border border-borderColor hover:bg-gray-50 rounded-md  mt-18 cursor-pointer"
      >
        Explore all Cars <img src={assets.arrow_icon} alt="arrow" />
      </button>
    </div>
  );
};

export default FeaturedSection;
