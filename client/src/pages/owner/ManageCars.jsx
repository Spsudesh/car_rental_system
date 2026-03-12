import React, { useEffect, useState } from"react";
import Title from"../../components/owner/Title";
import { assets } from"../../assets/assets";
import { API_URL } from "../../utils/api";

const ManageCars = () => {
 const [cars, setCars] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState("");
 const [success, setSuccess] = useState("");

useEffect(() => {
  fetchCars();
 }, []);

const fetchCars= async () => {
  try {
   setLoading(true);
   setError("");
    
 const response = await fetch(`${API_URL}/owner/cars`, {
  headers: {
       'Authorization': `Bearer ${localStorage.getItem('token')}`
     }
   });
    
 const data = await response.json();
    
   if (data.success) {
     setCars(data.cars);
   } else {
     setError("Failed to fetch cars");
   }
  } catch (err) {
   setError("Network error. Please try again.");
  } finally {
   setLoading(false);
  }
 };

const handleDelete= async (carId) => {
  if (!confirm("Are you sure you want to delete this car?")) return;
    
  try {
   setError("");
   setSuccess("");
    
 const response = await fetch(`${API_URL}/owner/car/${carId}`, {
  method: "DELETE",
  headers: {
       'Authorization': `Bearer ${localStorage.getItem('token')}`
     }
   });
    
 const data = await response.json();
    
   if (data.success) {
     setSuccess("Car deleted successfully");
     fetchCars();
   } else {
     setError(data.message || "Failed to delete car");
   }
  } catch (err) {
   setError("Network error. Please try again.");
  }
 };

const toggleAvailability= async (carId, currentStatus) => {
  try {
   setError("");
   setSuccess("");
    
 const response = await fetch(`${API_URL}/owner/car/${carId}`, {
  method: "PUT",
  headers: {
       'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
     },
     body: JSON.stringify({
      isAvailable: !currentStatus
     })
   });
    
 const data = await response.json();
    
   if (data.success) {
     setSuccess("Car availability updated");
     fetchCars();
   } else {
     setError(data.message || "Failed to update availability");
   }
  } catch (err) {
   setError("Network error. Please try again.");
  }
 };

 return (
  <div className="px-4 py-10 md:px-10 flex-1">
    <Title
     title="Manage Cars"
     subTitle="View and manage all your listed cars"
    />

    {error && (
     <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
       {error}
     </div>
    )}
    
    {success && (
     <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
       {success}
     </div>
    )}

    {loading ? (
     <div className="text-center py-20">
       <p className="text-gray-500">Loading your cars...</p>
     </div>
    ) : cars.length === 0 ? (
     <div className="text-center py-20">
       <p className="text-gray-500">No cars added yet</p>
       <button
        onClick={() => window.location.href='/owner/add-car'}
        className="mt-4 text-primary hover:underline"
       >
         Add your first car
       </button>
     </div>
    ) : (
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
       {cars.map((car) => (
        <div key={car._id} className="border border-borderColor rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <img
           src={car.image || assets.car_image1}
           alt={`${car.brand} ${car.model}`}
           className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{car.brand} {car.model}</h3>
            <p className="text-sm text-gray-500 mt-1">{car.year} • {car.category}</p>
            <p className="text-primary font-medium mt-2">Rs. {car.pricePerDay}/day</p>
            
            <div className="flex items-center justify-between mt-4">
              <span className={`text-xs px-2 py-1 rounded ${
                car.isAvailable 
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}>
                {car.isAvailable ? "Available" : "Not Available"}
              </span>
              
              <div className="flex gap-2">
                <button
                 onClick={() => toggleAvailability(car._id, car.isAvailable)}
                 className="text-sm text-primary hover:underline"
                >
                  {car.isAvailable ? "Mark Unavailable" : "Mark Available"}
                </button>
                <button
                 onClick={() => handleDelete(car._id)}
                 className="text-sm text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
       ))}
     </div>
    )}
  </div>
 );
};

export default ManageCars;
