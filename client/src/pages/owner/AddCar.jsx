import React, { useState } from"react";
import { assets } from"../../assets/assets";
import Title from"../../components/owner/Title";
import { API_URL } from "../../utils/api";

const AddCar = () => {
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState("");
 const [success, setSuccess] = useState("");

 // Debug: Check if API_URL is loaded
 console.log('API_URL from .env:', API_URL);
 
 const [car, setCar] = useState({
   brand: "",
   model: "",
   year: "",
   pricePerDay: "",
   category: "",
  transmission: "",
   fuel_type: "",
   seating_capacity: "",
   location: "",
   description: "",
 });

const onSubmitHandler= async (e) => {
  e.preventDefault();
 setError("");
 setSuccess("");
 setLoading(true);
   
  try {
 console.log('=== SUBMITTING CAR DATA ===');
 console.log('Car data:', car);
 console.log('API URL:', API_URL);
 console.log('Token:', localStorage.getItem('token') ? 'Present' : 'Missing');
   
   // Validate all required fields
 const requiredFields = ['brand', 'model', 'year', 'category', 'pricePerDay', 'location', 'fuel_type', 'transmission', 'seating_capacity', 'description'];
 const missingFields = requiredFields.filter(field => !car[field]);
 
 if (missingFields.length > 0) {
   setError(`❌ Missing required fields: ${missingFields.join(', ')}`);
   setLoading(false);
   return;
 }

   // Prepare car data (image assigned automatically on server)
 const carDataToSend = {
    brand: car.brand,
    model: car.model,
    year: parseInt(car.year),
    category: car.category,
    pricePerDay: parseInt(car.pricePerDay),
    location: car.location,
    fuel_type: car.fuel_type,
    transmission: car.transmission,
    seating_capacity: parseInt(car.seating_capacity),
    description: car.description
  };
  
 console.log('Sending car data:', carDataToSend);
   
const response = await fetch(`${API_URL}/owner/add-car`, {
 method: "POST",
 headers: {
     'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(carDataToSend)
  });
   
console.log('Response status:', response.status);
  
  if (!response.ok) {
   const errorData = await response.text();
   console.error('Error response:', errorData);
   throw new Error(`HTTP error! status: ${response.status}`);
  }
   
const data = await response.json();
console.log('Response data:', data);
   
  if (data.success) {
    setSuccess("✅ Car added successfully!");
  console.log('Car added with ID:', data.car._id);
    setCar({
      brand: "",
      model: "",
      year: "",
      pricePerDay: "",
      category: "",
   transmission: "",
      fuel_type: "",
      seating_capacity: "",
      location: "",
      description: "",
    });
  } else {
    setError("❌ " + (data.message || "Failed to add car"));
  console.error('Error adding car:', data.message);
  }
  } catch (err) {
console.error('Catch error:', err);
  setError("❌ Network error: " + err.message);
  } finally {
  setLoading(false);
  }
 };

 return (
  <div className="px-4 py-10 md:px-10 flex-1">
    <Title
     title="Add New Car"
     subTitle="Fill in details to list a new car for booking, including pricing, availability, and car specifications"
    />

    {error && (
     <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 max-w-xl">
       {error}
     </div>
    )}
    
    {success && (
     <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 max-w-xl">
       {success}
     </div>
    )}

    <form
     onSubmit={onSubmitHandler}
    className="flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl"
    >
      {/* CAR BRAND & MODEL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label>Brand</label>
          <input
           type="text"
           placeholder="e.g. BMW, Mercedes, Audi..."
         required
           value={car.brand}
           onChange={(e) => setCar({...car, brand: e.target.value})}
          className="px-3 py-2 border border-gray-300 rounded outline-primary"
          />
        </div>
        
        <div className="flex flex-col">
          <label>Model</label>
          <input
           type="text"
           placeholder="e.g. X5, A4, C-Class"
         required
           value={car.model}
           onChange={(e) => setCar({...car, model: e.target.value})}
          className="px-3 py-2 border border-gray-300 rounded outline-primary"
          />
        </div>
      </div>
      
      {/* Year & Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label>Year</label>
          <input
           type="number"
           placeholder="e.g. 2023"
         required
           value={car.year}
           onChange={(e) => setCar({...car, year: e.target.value})}
          className="px-3 py-2 border border-gray-300 rounded outline-primary"
          />
        </div>
        
        <div className="flex flex-col">
          <label>Category</label>
          <select
           value={car.category}
           onChange={(e) => setCar({...car, category: e.target.value})}
          className="px-3 py-2 border border-gray-300 rounded outline-primary"
         required
          >
            <option value="">Select Category</option>
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Coupe">Coupe</option>
            <option value="Convertible">Convertible</option>
            <option value="Van">Van</option>
          </select>
        </div>
      </div>
      
      {/* Price & Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label>Price Per Day (₹)</label>
          <input
           type="number"
           placeholder="e.g. 300"
         required
           value={car.pricePerDay}
           onChange={(e) => setCar({...car, pricePerDay: e.target.value})}
          className="px-3 py-2 border border-gray-300 rounded outline-primary"
          />
        </div>
        
        <div className="flex flex-col">
          <label>Location</label>
          <input
           type="text"
           placeholder="e.g. Sangli, Pune, Kolhapur"
         required
           value={car.location}
           onChange={(e) => setCar({...car, location: e.target.value})}
          className="px-3 py-2 border border-gray-300 rounded outline-primary"
          />
        </div>
      </div>
      
      {/* Fuel Type & Transmission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label>Fuel Type</label>
          <select
           value={car.fuel_type}
           onChange={(e) => setCar({...car, fuel_type: e.target.value})}
          className="px-3 py-2 border border-gray-300 rounded outline-primary"
         required
          >
            <option value="">Select Fuel Type</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
        
        <div className="flex flex-col">
          <label>Transmission</label>
          <select
           value={car.transmission}
           onChange={(e) => setCar({...car, transmission: e.target.value})}
          className="px-3 py-2 border border-gray-300 rounded outline-primary"
         required
          >
            <option value="">Select Transmission</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
            <option value="Semi-Automatic">Semi-Automatic</option>
          </select>
        </div>
      </div>
      
      {/* Seating Capacity */}
      <div className="flex flex-col">
        <label>Seating Capacity</label>
        <select
         value={car.seating_capacity}
         onChange={(e) => setCar({...car, seating_capacity: e.target.value})}
        className="px-3 py-2 border border-gray-300 rounded outline-primary"
       required
        >
          <option value="">Select Seats</option>
          <option value="2">2 Seats</option>
          <option value="4">4 Seats</option>
          <option value="5">5 Seats</option>
          <option value="7">7 Seats</option>
          <option value="8">8+ Seats</option>
        </select>
      </div>
      
      {/* Description */}
      <div className="flex flex-col">
        <label>Description</label>
        <textarea
         placeholder="Describe the car features..."
       required
         value={car.description}
         onChange={(e) => setCar({...car, description: e.target.value})}
        className="px-3 py-2 border border-gray-300 rounded outline-primary min-h-[100px]"
         rows="4"
        />
      </div>
      
      <button
       type="submit"
       disabled={loading}
      className="bg-primary hover:bg-indigo-600 transition-all text-white py-3 px-6 rounded-lg cursor-pointer font-medium disabled:opacity-50"
      >
        {loading ? "Adding Car..." : "Add Car"}
      </button>
    </form>
  </div>
 );
};

export default AddCar;
