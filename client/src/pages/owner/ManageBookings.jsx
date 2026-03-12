import React, { useEffect, useState } from"react";
import Title from"../../components/owner/Title";
import { assets } from"../../assets/assets";
import { API_URL } from "../../utils/api";

const ManageBookings = () => {
 const [bookings, setBookings] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState("");
 const [success, setSuccess] = useState("");

useEffect(() => {
  fetchBookings();
 }, []);

const fetchBookings= async () => {
  try {
   setLoading(true);
   setError("");
    
 const response = await fetch(`${API_URL}/owner/bookings`, {
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
   setError("Network error. Please try again.");
  } finally {
   setLoading(false);
  }
 };

const updateStatus= async (bookingId, status) => {
  try {
   setError("");
   setSuccess("");
    
 const response = await fetch(`${API_URL}/owner/booking/${bookingId}/status`, {
  method: "PUT",
  headers: {
       'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
     },
     body: JSON.stringify({ status })
   });
    
 const data = await response.json();
    
   if (data.success) {
     setSuccess(`Booking ${status} successfully`);
     fetchBookings();
   } else {
     setError(data.message || "Failed to update booking status");
   }
  } catch (err) {
   setError("Network error. Please try again.");
  }
 };

 return (
  <div className="px-4 py-10 md:px-10 flex-1">
    <Title
     title="Manage Bookings"
     subTitle="View and manage all bookings for your cars"
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
       <p className="text-gray-500">Loading bookings...</p>
     </div>
    ) : bookings.length === 0 ? (
     <div className="text-center py-20">
       <p className="text-gray-500">No bookings yet</p>
     </div>
    ) : (
     <div className="space-y-4 mt-8">
       {bookings.map((booking, index) => (
        <div
         key={index}
        className="border border-borderColor rounded-lg p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start">
            {/* Car Info */}
            <div className="flex items-start gap-4 flex-1">
              <img
               src={booking.car?.image || assets.car_image1}
               alt=""
              className="w-24 h-24 object-cover rounded"
              />
              <div>
                <h3 className="font-semibold text-lg">{booking.car?.brand} {booking.car?.model}</h3>
                <p className="text-sm text-gray-500">{booking.user?.name}</p>
                <p className="text-xs text-gray-400">{booking.user?.email}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span>Pickup: {new Date(booking.pickupDate).toLocaleDateString()}</span>
                  <span>Return: {new Date(booking.returnDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Booking Details */}
            <div className="flex flex-col items-end gap-2">
              <div className="text-right">
                <p className="text-2xl font-semibold text-primary">Rs. {booking.price}</p>
                <p className="text-xs text-gray-500">{booking.days} days</p>
              </div>
              
              <span className={`px-3 py-1 rounded-full text-xs capitalize ${
                booking.status === "confirmed"
                  ? "bg-green-100 text-green-700"
                  : booking.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : booking.status === "cancelled"
                  ? "bg-red-100 text-red-700"
                  : "bg-blue-100 text-blue-700"
              }`}>
                {booking.status}
              </span>

              {/* Action Buttons */}
              {booking.status === "pending" && (
               <div className="flex gap-2 mt-2">
                 <button
                   onClick={() => updateStatus(booking._id, "confirmed")}
                  className="px-4 py-2 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                 >
                   Confirm
                 </button>
                 <button
                   onClick={() => updateStatus(booking._id, "cancelled")}
                  className="px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                 >
                   Cancel
                 </button>
               </div>
              )}
              
              {booking.status === "confirmed" && (
               <button
                 onClick={() => updateStatus(booking._id, "completed")}
                className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
               >
                 Mark Completed
               </button>
              )}
            </div>
          </div>
        </div>
       ))}
     </div>
    )}
  </div>
 );
};

export default ManageBookings;
