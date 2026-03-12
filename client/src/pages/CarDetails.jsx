import React, { useEffect, useState } from"react";
import { useParams, useNavigate } from"react-router-dom";
import { assets, dummyCarData } from"../assets/assets";
import Loader from"../components/Loader";
import { API_URL, CURRENCY } from "../utils/api";

const CarDetails = () => {
 const { id } = useParams();
 const navigate = useNavigate();
 const [car, setCar] = useState(null);
 const [loading, setLoading] = useState(true);
 const [bookingLoading, setBookingLoading] = useState(false);
 const [message, setMessage] = useState("");
 const [pickupDate, setPickupDate] = useState("");
 const [returnDate, setReturnDate] = useState("");
 const currency = CURRENCY;  

useEffect(() => {
  fetchCarDetails();
 }, [id]);

const fetchCarDetails= async () => {
  try {
   setLoading(true);
 const response = await fetch(`${API_URL}/car/${id}`);
 const data = await response.json();
    
   if (data.success) {
     setCar(data.car);
   } else {
     setMessage("Car not found");
   }
  } catch (err) {
 console.error('Error fetching car:', err);
   // Fallback to dummy data
   setCar(dummyCarData.find((car) => car._id === id));
  } finally {
   setLoading(false);
  }
 };

const handleSubmit= async (e) => {
  e.preventDefault();
    
  // Check if user is logged in by checking token
 const token = localStorage.getItem('token');
  if (!token) {
    setMessage("Please login to book a car");
 return;
   }
    
  if (!pickupDate || !returnDate) {
    setMessage("Please select pickup and return dates");
 return;
   }
    
 const pickup = new Date(pickupDate);
 const returnD = new Date(returnDate);
    
  if (returnD <= pickup) {
    setMessage("Return date must be after pickup date");
 return;
   }
    
  try {
   setBookingLoading(true);
   setMessage("");
    
 console.log('=== STARTING BOOKING ===');
 console.log('Token:', token ? 'Present' : 'Missing');
 console.log('Car ID:', id);
 console.log('Pickup:', pickupDate);
 console.log('Return:', returnDate);
    
 const response = await fetch(`${API_URL}/user/booking`, {
 method: "POST",
 headers: {
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${token}`
   },
   body: JSON.stringify({
     carId: id,
     pickupDate: pickupDate,
   returnDate: returnDate
   })
 });
    
 console.log('Response status:', response.status);
    
 if (!response.ok) {
   throw new Error(`HTTP error! status: ${response.status}`);
 }
    
 const data = await response.json();
 console.log('Response data:', data);
    
   if (data.success) {
     setMessage("✅ Booking created successfully!");
     // Clear form
     setPickupDate("");
     setReturnDate("");
     setTimeout(() => {
       navigate("/my-bookings");
     }, 2000);
   } else {
     setMessage("❌ " + (data.message || "Booking failed"));
   }
  } catch (err) {
 console.error('Booking error:', err);
   setMessage("❌ Network error: " + err.message);
  } finally {
   setBookingLoading(false);
  }
 };

 return loading ? (
  <Loader/>
 ) : car ? (
  <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16">
    <button
     onClick={() => navigate(-1)}
   className="flex items-center gap-2 text-gray-500 cursor-pointer mb-6"
    >
      <img src={assets.arrow_icon} alt="" className="rotate-180 opacity-65" />
      Back to all cars
    </button>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
      {/* Left : car image and details */}
      <div className="lg:col-span-2">
        <img
         src={car.image}
         alt={`${car.brand} ${car.model}`}
       className="w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md"
        />
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">
              {car.brand} {car.model}
            </h1>
            <p className="text-gray-500 text-lg">{car.category} • {car.year}</p>
          </div>
          <hr className="border-borderColor my-6"/>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
            {[
              {icon:assets.users_icon,text:`${car.seating_capacity} Seats`},
              {icon:assets.fuel_icon,text:`${car.fuel_type}`},
              {icon:assets.location_icon,text:`${car.location}`},
            ].map(({icon,text})=>(
              <div  key={text} className="flex flex-col items-center bg-light p-4 rounded-lg gap-3">
                <img src={icon} alt={text} className="h-5 mb-2"/>
                {text}
              </div>
            ))}
          </div>
          
          {/* description */}
          <div>
            <h1 className="text-sxl font-medium mb-3">
              Description
            </h1>
            <p className="text-gray-500">{car.description}</p>
          </div>
          
          {/* features */}
          <div>
            <h1 className="text-sxl font-medium mb-3">
              Features
            </h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {
                ["360 Camera","Bluetooth","Backup Camera","Cruise Control","Heated Seats","Keyless Entry","Leather Seats","Navigation System","Remote Start","Sunroof","USB Port"].map((feature)=>(
                  <li key={feature} className="flex items-center text-gray-500">
                    <img src={assets.check_icon} alt="check" className="h-4 mr-2"/>
                    {feature}
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>

      {/* Right : booking form */}
      <form onSubmit={handleSubmit} className="shadow-lg h-max sticky top-18 rounded-xl p-6 space-y-6 text-gray-500">
        <p className="flex items-center justify-between text-2xl text-gray-800 font-semibold">
         {currency} {car.pricePerDay}{" "}
         <span className="text-base text-gray-400 font-normal"> per day</span>
        </p>
        <hr className="border-borderColor my-6" />
        
        {message && (
         <p className={`text-sm text-center p-2 rounded ${
         message.includes('✅') ? 'bg-green-100 text-green-700' : 
         message.includes('❌') ? 'bg-red-100 text-red-700' : 
           'bg-yellow-100 text-yellow-700'
         }`}>
           {message}
         </p>
        )}
        
        <div className="flex flex-col gap-2">
          <label htmlFor="pickup-date"> Pickup Date</label>
          <input
           type="date"
           value={pickupDate}
           onChange={(e) => setPickupDate(e.target.value)}
         className="border border-borderColor px-3 py-2 rounded-lg"
           id="pickup-date"
           min={new Date().toISOString().split('T')[0]}
       required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="return-date"> Return Date</label>
          <input
           type="date"
           value={returnDate}
           onChange={(e) => setReturnDate(e.target.value)}
         className="border border-borderColor px-3 py-2 rounded-lg"
           id="return-date"
           min={pickupDate || new Date().toISOString().split('T')[0]}
       required
          />
        </div>

        <button
         type="submit"
         disabled={bookingLoading}
       className="w-full bg-primary hover:bg-primary-dull transition-all py-3 font-medium text-white rounded-xl cursor-pointer disabled:opacity-50"
        >
          {bookingLoading ? "Processing..." : "Book Now"}
        </button>
        <p className="text-center text-sm"> No credit card required to reserve</p>
      </form>
    </div>
  </div>
 ) : (
  <div className="text-center py-20">
    <p className="text-gray-500">Car not found</p>
    <button
     onClick={() => navigate("/cars")}
   className="mt-4 text-primary hover:underline"
    >
      Browse available cars
    </button>
  </div>
 );
};

export default CarDetails;
