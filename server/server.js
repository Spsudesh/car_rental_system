import express from"express";
import "dotenv/config";
import cors from"cors";
import connectDB from"./configs/db.js";
import userRouter from"./routes/userRoutes.js";
import ownerRouter from"./routes/ownerRoutes.js";
import carRouter from"./routes/carRoutes.js";

// Initialize express app
const app=express();

// connect db
await connectDB();

//middleware
const allowedOrigins = [
 
    "https://car-rental-system-ochre.vercel.app",
    "https://car-rental-system-git-main-spsudeshs-projects.vercel.app",
    "http://localhost:3001",
    "http://localhost:5173"
  
];

const corsOptions = {
  origin: (origin, cb) => {
    // allow requests with no origin (mobile apps, curl, postman, etc.)
    if (!origin || allowedOrigins.includes(origin)) cb(null, true);
    else cb(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));

app.get("/", (req, res) => res.send("server is running"));
app.use('/api/user', userRouter)
app.use('/api/owner',ownerRouter)
app.use('/api/car', carRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
