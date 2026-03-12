import express from"express";
import {protect} from"../middlewave/auth.js";
import { 
  changeRoleToOwner, 
  addCar, 
  getOwnerCars, 
  updateCarAvailability, 
  deleteCar 
} from"../controllers/ownerController.js";
import {
  getOwnerBookings,
  updateBookingStatus,
  getDashboardStats
} from"../controllers/bookingController.js";

const ownerRouter =express.Router();

ownerRouter.post("/change-role", protect, changeRoleToOwner);
ownerRouter.post("/add-car", protect, addCar);
ownerRouter.get("/cars", protect, getOwnerCars);
ownerRouter.put("/car/:carId", protect, updateCarAvailability);
ownerRouter.delete("/car/:carId", protect, deleteCar);

// Booking routes for owner
ownerRouter.get("/bookings", protect, getOwnerBookings);
ownerRouter.put("/booking/:bookingId/status", protect, updateBookingStatus);
ownerRouter.get("/dashboard-stats", protect, getDashboardStats);

export default ownerRouter;
