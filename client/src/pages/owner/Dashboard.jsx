import React, { useEffect, useState } from"react";
import { assets, dummyDashboardData } from"../../assets/assets";
import Title from"../../components/owner/Title";
import { API_URL } from "../../utils/api";

const Dashboard = () => {
 const [data, setData] = useState(dummyDashboardData);
 const [loading, setLoading] = useState(true);

useEffect(() => {
  // Fetch real dashboard stats
 const fetchStats= async () => {
  try {
 const response = await fetch(`${API_URL}/owner/dashboard-stats`, {
 headers: {
     'Authorization': `Bearer ${localStorage.getItem('token')}`
   }
  });
 const result = await response.json();
  if (result.success) {
    setData(result.stats);
  }
  } catch (err) {
 console.error('Error fetching dashboard stats:', err);
  // Use dummy data as fallback
 setData(dummyDashboardData);
  } finally {
 setLoading(false);
  }
};

 fetchStats();
 }, []);

const dashboardCards = [
  {
   title: "Total Cars",
   value: data.totalCars,
  icons: assets.carIconColored,
  },
  {
  title: "Total Bookings",
  value: data.totalBookings,
  icons: assets.listIconColored,
  },
  {
  title: "Pending",
  value: data.pendingBookings,
  icons: assets.cautionIconColored,
  },
  {
  title: "Confirmed",
  value: data.completedBookings,
  icons: assets.listIconColored,
  },
 ];

 return (
  <div className="px-4 pt-10 md:px-10 flex-1">
   <Title
    title="Admin Dashboard"
    subTitle="Monitor overall platform performance including total cars, bookings, revenue, and recent activities"
   />

   {loading ? (
    <div className="text-center py-20">
      <p className="text-gray-500">Loading dashboard...</p>
    </div>
   ) : (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 max-w-3xl">
        {dashboardCards.map((card, index) => (
         <div
          key={index}
       className="flex gap-2 items-center justify-between p-4 rounded-md border border-borderColor shadow-sm hover:shadow-md transition-shadow"
         >
           <div>
             <h1 className="text-xs text-gray-500">{card.title}</h1>
             <p className="text-lg font-semibold text-gray-800">{card.value}</p>
           </div>
           <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
             <img src={card.icons} alt={card.title} className="h-4 w-4" />
           </div>
         </div>
        ))}
      </div>

      <div className="flex flex-wrap items-start gap-6 mb-8 w-full">
        {/* Recent bookings */}
        <div className="p-4 md:p-6 border border-borderColor rounded-md max-w-lg w-full shadow-sm">
          <h1 className="text-lg font-medium text-gray-800">Recent Bookings</h1>
          <p className="text-gray-500 text-sm mb-4">Latest customer bookings</p>
          
          {data.recentBookings && data.recentBookings.length === 0 ? (
           <p className="text-gray-500 text-sm">No recent bookings</p>
          ) : (
           data.recentBookings?.map((booking, index) => (
            <div key={index} className="mb-4 flex items-center justify-between last:mb-0 pb-3 last:pb-0 border-b last:border-0 border-borderColor">
              <div className="flex items-center gap-2">
                <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                  <img
                   src={assets.listIconColored}
                   alt=""
                className="h-5 w-5"
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-700">
                    {booking.car?.brand} {booking.car?.model}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(booking.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <p className="text-sm text-gray-600">₹{booking.price}</p>
                <span className={`px-3 py-0.5 border border-borderColor rounded-full text-xs capitalize ${
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
              </div>
            </div>
           ))
          )}
        </div>
        
        {/* Monthly Revenue Card */}
        <div className="p-4 md:p-6 border border-borderColor rounded-md flex-1 min-w-[250px] shadow-sm bg-gradient-to-br from-primary/5 to-white">
          <h1 className="text-lg font-medium text-gray-800">Monthly Revenue</h1>
          <p className="text-gray-500 text-sm mb-2">Total revenue from completed bookings</p>
          <div className="mt-6 text-center">
            <p className="text-4xl font-bold text-primary">₹{data.monthlyRevenue}</p>
            <p className="text-sm text-gray-500 mt-2">This month</p>
          </div>
        </div>
      </div>
    </>
   )}
  </div>
 );
};

export default Dashboard;
