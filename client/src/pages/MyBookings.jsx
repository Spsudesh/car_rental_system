import React, { useEffect, useState } from"react";
import { assets, dummyMyBookingsData } from"../assets/assets";
import Title from"../components/Title";
import { useAuth } from"../context/AuthContext";
import { API_URL, CURRENCY } from "../utils/api";

const MyBookings = () => {
 const currency = CURRENCY;
 const [bookings, setBookings] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState("");
 const { isAuthenticated } = useAuth();

const fetchMyBookings= async () => {
  try {
   setLoading(true);
   setError("");
    
 const response = await fetch(`${API_URL}/user/bookings`, {
  headers: {
       'Authorization': `Bearer ${localStorage.getItem('token')}`
     }
   });
    
 const data = await response.json();
    
   if (data.success) {
     setBookings(data.bookings);
   } else {
     setError("Failed to fetch bookings");
   }
  } catch (err) {
   // Fallback to dummy data for development
   setBookings(dummyMyBookingsData);
   setError("");
  } finally {
   setLoading(false);
  }
 };

useEffect(() => {
  if (isAuthenticated) {
   fetchMyBookings();
  } else {
   setLoading(false);
   setError("Please login to view your bookings");
  }
 }, [isAuthenticated]);

 return (
  <div className="px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl">
    <Title
     title="My Bookings"
     subTitle="View and manage all your car bookings"
     align="left"
    />

    {!isAuthenticated ? (
     <div className="text-center py-20">
       <p className="text-gray-500 mb-4">{error}</p>
       <button
        onClick={() => window.location.href='/'}
        className="text-primary hover:underline"
       >
         Go to Login
       </button>
     </div>
    ) : error && !loading ? (
     <div className="text-center py-20">
       <p className="text-red-500 mb-4">{error}</p>
       <button
        onClick={fetchMyBookings}
        className="text-primary hover:underline"
       >
         Retry
       </button>
     </div>
    ) : loading ? (
     <div className="text-center py-20">
       <p className="text-gray-500">Loading bookings...</p>
     </div>
    ) : bookings.length === 0 ? (
     <div className="text-center py-20">
       <p className="text-gray-500">No bookings yet</p>
       <button
        onClick={() => window.location.href='/cars'}
        className="mt-4 text-primary hover:underline"
       >
         Browse cars
       </button>
     </div>
    ) : (
     <div>
       {bookings.map((booking, index) => (
        <div
         key={index}
         className="grid grid-col-1 md:grid-cols-4 gap-6 p-6 border border-borderColor rounded-lg mt-5 first:mt-12"
        >
          {/* car image + car info */}
          <div className="md:col-span-1">
            <div className="rounded-md overflow-hidden mb-3">
              <img
               src={booking.car?.image || assets.car_image1}
               alt=""
               className="w-full h-auto aspect-video object-cover"
              />
            </div>
            <p className="text-lg font-medium mt-2">
              {booking.car?.brand} {booking.car?.model}
            </p>
            <p className="text-gray-500">
              {booking.car?.year} • {booking.car?.category} •{" "}
              {booking.car?.location}
            </p>
          </div>

          {/* Booking Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <p className="px-3 py-1.5 bg-light rounded">
                Booking #{index + 1}
              </p>
              <p
               className={`px-3 py-1 text-xs rounded-full capitalize ${
                 booking.status === "confirmed"
                   ? "bg-green-400/15 text-green-600 "
                   : booking.status === "pending"
                   ? "bg-yellow-400/15 text-yellow-600"
                   : booking.status === "cancelled"
                   ? "bg-red-400/15 text-red-600"
                   : "bg-blue-400/15 text-blue-600"
               }`}
              >
                {booking.status}
              </p>
            </div>
            <div className="flex items-start gap-2 mt-3">
              <img
               src={assets.calendar_icon_colored}
               alt="calendar"
               className="w-4 h-4 mt-1"
              />
              <div>
                <p className="text-gray-500">Rental Period</p>
                <p>
                  {new Date(booking.pickupDate).toLocaleDateString()} To{" "}
                  {new Date(booking.returnDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2 mt-3">
              <img
               src={assets.location_icon_colored}
               alt="location"
               className="w-4 h-4 mt-1"
              />
              <div>
                <p className="text-gray-500">Pick-up Location</p>
                <p>{booking.car?.location}</p>
              </div>
            </div>
          </div>
          
          {/* price */}
          <div className="md:col-span-1 flex flex-col justify-between gap-6">
            <div className="text-sm text-gray-500 text-right">
              <p>Total Price</p>
              <h1 className="text-2xl font-semibold text-primary">
               {currency}
               {booking.price}
              </h1>
              <p>Booked on {new Date(booking.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
       ))}
     </div>
    )}
  </div>
 );
};

export default MyBookings;
