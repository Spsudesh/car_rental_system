import mongoose from"mongoose";
import Booking from"../models/booking.js";
import Car from"../models/Car.js";

// Create new booking - Simplified version
export const createBooking = async (req, res) => {
  try {
   console.log('=== BOOKING REQUEST RECEIVED ===');
   console.log('User from token:', req.user);
   console.log('Request body:', req.body);
    
    // Get data from request
   const carId = req.body.carId;
   const pickupDate = req.body.pickupDate;
   const returnDate = req.body.returnDate;
    
    // Get user ID from authenticated user
   const userId = req.user._id;
    
   console.log('Parsed data:', { carId, pickupDate, returnDate, userId });
    
    // Validate input
    if (!carId || !pickupDate || !returnDate) {
     console.log('Missing required fields:', { carId, pickupDate, returnDate });
     return res.json({ 
        success: false, 
       message: "Missing required fields: carId, pickupDate, returnDate" 
      });
    }
    
    // Check if user is valid
    if (!userId) {
     return res.json({ 
        success: false, 
       message: "User not authenticated" 
      });
    }

    // Validate dates
    const pickup = new Date(pickupDate);
    const returnD = new Date(returnDate);
    
    if (isNaN(pickup.getTime()) || isNaN(returnD.getTime())) {
      return res.json({
        success: false,
        message: "Invalid date format"
      });
    }
    
    if (returnD <= pickup) {
      return res.json({
        success: false,
        message: "Return date must be after pickup date"
      });
    }
    
    // Find the car
   const car = await Car.findById(carId);
    
    if (!car) {
     console.log('Car not found with ID:', carId);
     return res.json({ 
        success: false, 
       message: "Car not found" 
      });
    }

    if (!car.isAvailable) {
      return res.json({
        success: false,
        message: "Car is not available for booking"
      });
    }
    
   console.log('Car found:', car.brand, car.model);
    
    // Calculate days and price
   const timeDiff = returnD.getTime() - pickup.getTime();
   const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Correct day calculation
    
    if (days < 1) {
     return res.json({ 
        success: false, 
       message: "Booking must be at least 1 day" 
      });
    }
    
    // Convert pricePerDay to number and calculate total
   const pricePerDay = parseInt(car.pricePerDay) || 0;
   const totalPrice = pricePerDay * days;
    
    if (totalPrice <= 0) {
      return res.json({
        success: false,
        message: "Invalid price calculation"
      });
    }
    
   console.log('Price calculation:', {pricePerDay, days, totalPrice });
    
    // Create booking object
   const bookingData = {
      car: new mongoose.Types.ObjectId(carId),
      user: new mongoose.Types.ObjectId(userId),
      owner: new mongoose.Types.ObjectId(car.owner),
      pickupDate: new Date(pickupDate),
     returnDate: new Date(returnDate),
      status: "pending",
      price: totalPrice,
      days: days
    };
    
   console.log('Creating booking with data:', bookingData);
    
    // Save to database
   const booking = new Booking(bookingData);
    await booking.save();
    
   console.log('✅ BOOKING CREATED SUCCESSFULLY!');
   console.log('Booking ID:', booking._id);
    
   res.json({ 
      success: true, 
     message: "Booking created successfully",
      booking: booking
    });
    
  } catch (error) {
   console.error('❌ BOOKING ERROR:', error);
   console.error('Error stack:', error.stack);
   res.status(500).json({
      success: false,
     message: error.message || "Failed to create booking"
    });
  }
};

// Get user bookings
export const getUserBookings = async (req, res) => {
  try {
   const userId = req.user._id;
   console.log('Fetching bookings for user:', userId);
    
   const bookings = await Booking.find({ user: userId })
      .populate("car")
      .sort({ createdAt: -1 });
    
   console.log('Found bookings:', bookings.length);
   res.json({ success: true, bookings });
  } catch (error) {
   console.error("Get bookings error:", error.message);
   res.json({ success: false, message: error.message });
  }
};

// Get all bookings - Admin only
export const getOwnerBookings = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.json({ 
        success: false, 
        message: "Unauthorized: Admin access required" 
      });
    }
    
    console.log('Fetching all bookings for admin');
    
    const bookings = await Booking.find({})
      .populate("car")
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    
    console.log('Found bookings:', bookings.length);
    res.json({ success: true, bookings });
  } catch (error) {
    console.error("Get bookings error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

// Update booking status
export const updateBookingStatus = async (req, res) => {
  try {
   const { bookingId} = req.params;
   const { status } = req.body;
    
   console.log('Updating booking:', bookingId, 'to status:', status);
    
   const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    ).populate("car");
    
   res.json({ success: true, message: "Booking status updated", booking });
  } catch (error) {
   console.error("Update status error:", error.message);
   res.json({ success: false, message: error.message });
  }
};

// Get dashboard stats - Admin only (shows all data)
export const getDashboardStats = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.json({ 
        success: false, 
        message: "Unauthorized: Admin access required" 
      });
    }
    
    const totalCars = await Car.countDocuments({});
    const totalBookings = await Booking.countDocuments({});
    const pendingBookings = await Booking.countDocuments({ status: "pending" });
    const completedBookings = await Booking.countDocuments({ status: "completed" });
    
    const completed = await Booking.find({ status: "completed" });
    const monthlyRevenue = completed.reduce((sum, b) => sum + b.price, 0);
    
    const recentBookings = await Booking.find({})
      .populate("car")
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(5);
    
    res.json({
      success: true,
      stats: {
        totalCars,
        totalBookings,
        pendingBookings,
        completedBookings,
        monthlyRevenue,
        recentBookings
      }
    });
  } catch (error) {
    console.error("Dashboard stats error:", error.message);
    res.json({ success: false, message: error.message });
  }
};
