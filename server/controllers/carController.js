import Car from"../models/Car.js";

// Get all available cars
export const getAllCars = async (req, res) => {
  try {
 const { search, category, fuel_type, transmission } = req.query;
    
   let query = { isAvailable: true };
    
   if (search) {
    query.$or = [
      { brand: { $regex: search, $options: "i" } },
      { model: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } }
     ];
   }
    
   if (category && category !== "All") {
    query.category = category;
   }
    
   if (fuel_type && fuel_type !== "All") {
    query.fuel_type = fuel_type;
   }
    
   if (transmission && transmission !== "All") {
    query.transmission = transmission;
   }
    
 const cars = await Car.find(query).populate("owner", "name email");
 res.json({ success: true, cars });
  } catch (error) {
 console.error("Error:", error.message);
 res.json({ success: false, message: error.message });
  }
};

// Get car by ID
export const getCarById = async (req, res) => {
  try {
 const { id } = req.params;
 const car = await Car.findById(id).populate("owner", "name email");
   
  if (!car) {
   return res.json({ success: false, message: "Car not found" });
   }
    
 res.json({ success: true, car });
  } catch (error) {
 console.error("Error:", error.message);
 res.json({ success: false, message: error.message });
  }
};
