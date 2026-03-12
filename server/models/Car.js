
import mongoose, { mongo } from "mongoose";


const {ObjectId} =mongoose.Schema.Types

const carSchema = new mongoose.Schema({
  owner: { type: ObjectId, ref: "user" },
  brand: { type: String, required: true },
  model: { type: String, required: true },
  image: { type: String}, // Not required since we assign automatically
  year: { type: String, required: true },
  category: { type: String, required: true },
  seating_capacity: { type: String, required: true },
  fuel_type: { type: String, required: true },
  transmission: { type: String, required: true },
  pricePerDay: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  isAvailable: {type:Boolean, default:true}
},{timestamps:true});

const Car =mongoose.model('Car', carSchema)

export default Car;