import express from"express";
import "dotenv/config";
import connectDB from"./configs/db.js";
import userRouter from"./routes/userRoutes.js";
import ownerRouter from"./routes/ownerRoutes.js";
import carRouter from"./routes/carRoutes.js";
import cors from"cors";

// Initialize express app
const app=express();

// connect db
await connectDB();


// middleware
app.use(cors({
  origin: 'https://car-rental-system-4xa4.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));

app.get("/", (req, res) => res.send("server is running"));
app.use('/api/user', userRouter)
app.use('/api/owner',ownerRouter)
app.use('/api/car', carRouter)



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
