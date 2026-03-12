import mongoose from"mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from"./models/user.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
   console.log("✅ MongoDB connected");

    // Check if admin already exists
   const existingAdmin = await User.findOne({ email: "admin@example.com" });
    
    if (existingAdmin) {
     console.log("ℹ️  Admin user already exists");
      await mongoose.disconnect();
      process.exit(0);
    }

    // Hash password
   const hashedPassword = await bcrypt.hash("admin", 10);

    // Create admin user
   const adminUser= await User.create({
      name: "Admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: "owner",
      image: ""
    });

   console.log("✅ Admin user created successfully!");
   console.log("📧 Email: admin@example.com");
   console.log("🔑 Password: admin");
   console.log("👤 Role: owner");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
   console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

seedAdmin();
