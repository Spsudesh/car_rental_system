import User from"../models/user.js";
import Car from"../models/Car.js";

export const changeRoleToOwner= async (req, res) => {
  // This endpoint is deprecated - only admin can add cars
  res.json({ 
    success: false, 
    message: "Only admin can manage cars. Contact administrator." 
  });
};

// API to add car - Admin only
export const addCar = async (req, res) => {
  try {
    console.log('=== ADD CAR REQUEST RECEIVED ===');
    console.log('User from token:', req.user);
    console.log('Request body:', req.body);

    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.json({ 
        success: false, 
        message: "Unauthorized: Only admin can add cars" 
      });
    }

    const carData = req.body;

    // Validate required fields
    const requiredFields = ['brand', 'model', 'year', 'pricePerDay', 'category', 'location', 'description', 'fuel_type', 'transmission', 'seating_capacity'];
    const missingFields = requiredFields.filter(field => !carData[field]);

    if (missingFields.length > 0) {
      return res.json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Validate year
    const year = parseInt(carData.year);
    if (isNaN(year) || year < 1900 || year > new Date().getFullYear() + 1) {
      return res.json({
        success: false,
        message: 'Year must be a valid number between 1900 and current year'
      });
    }

    // Validate price
    const price = parseInt(carData.pricePerDay);
    if (isNaN(price) || price <= 0) {
      return res.json({
        success: false,
        message: 'Price must be a valid positive number'
      });
    }

    // Assign sequential image
    const totalCars = await Car.countDocuments();
    const imageIndex = (totalCars % 4) + 1;
    const imageUrl = `/assets/car_image${imageIndex}.png`;

    // Create new car (no owner field - admin manages all)
    const car = new Car({
      brand: carData.brand.trim(),
      model: carData.model.trim(),
      year: carData.year,
      category: carData.category,
      pricePerDay: carData.pricePerDay,
      location: carData.location.trim(),
      image: imageUrl,
      description: carData.description.trim(),
      fuel_type: carData.fuel_type,
      transmission: carData.transmission,
      seating_capacity: carData.seating_capacity,
      isAvailable: true
    });

    await car.save();
    console.log('✅ CAR ADDED SUCCESSFULLY!');

    res.json({ success: true, message: "Car added successfully", car });
  } catch (error) {
    console.error('❌ ERROR ADDING CAR:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all cars - Admin only
export const getOwnerCars = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.json({ 
        success: false, 
        message: "Unauthorized: Admin access required" 
      });
    }
    
    const cars = await Car.find({});
    res.json({ success: true, cars });
  } catch (error) {
    console.error("Error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

// Update car availability - Admin only
export const updateCarAvailability = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.json({ 
        success: false, 
        message: "Unauthorized: Admin access required" 
      });
    }
    
    const { carId } = req.params;
    const { isAvailable } = req.body;

    console.log('Updating car availability:', { carId, isAvailable });

    await Car.findByIdAndUpdate(carId, { isAvailable }, { new: true });
    console.log('✅ Car availability updated successfully');
    res.json({ success: true, message: "Car availability updated" });
  } catch (error) {
    console.error("Error:", error.message);
    res.json({ success: false, message: error.message });
  }
};

// Delete car - Admin only
export const deleteCar = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.json({ 
        success: false, 
        message: "Unauthorized: Admin access required" 
      });
    }
    
    const { carId } = req.params;

    console.log('Deleting car:', { carId });

    await Car.findByIdAndDelete(carId);
    console.log('✅ Car deleted successfully');
    res.json({ success: true, message: "Car deleted successfully" });
  } catch (error) {
    console.error("Error:", error.message);
    res.json({ success: false, message: error.message });
  }
};
