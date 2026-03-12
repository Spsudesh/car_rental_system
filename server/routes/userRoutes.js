import express from"express";
const userRouter=express.Router();
import { getUserData, loginUser, registerUser } from"../controllers/userController.js";
import {protect} from"../middlewave/auth.js";
import {
  createBooking,
  getUserBookings
} from"../controllers/bookingController.js";

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/data", protect, (req, res) => {
 res.json({
   success: true,
   message: "Authorized access!",
   user: req.user,
  });
});

// Booking routes for user
userRouter.post("/booking", protect, createBooking);
userRouter.get("/bookings", protect, getUserBookings);

export default userRouter;
