import React, { useState } from "react";
import { assets } from "../../assets/assets"; // ✅ You forgot to import assets
import Title from "../../components/owner/Title";

const AddCar = () => {
  const [image, setImage] = useState(null);
  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: "",
    pricePerDay: "",
    category: "",
    transmission: "",
    fuel_type: "",
    seating_capacity: "",
    location: "",
    description: "",
  });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("Car details submitted:", car);
    console.log("Uploaded image:", image);
  };

  return (
    <div className="px-4 py-10 md:px-10 flex-1">
      <Title
        title="Add New Car"
        subTitle="Fill in details to list a new car for booking, including pricing, availability, and car specifications"
      />

      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl"
      >
        {/* Car Image */}
        <div className="flex items-center gap-2 w-full">
          <label
            htmlFor="car-image"
            className="cursor-pointer flex items-center gap-3"
          >
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              alt="Car Upload Preview"
              className="h-14 w-14 object-cover rounded border border-gray-300"
            />
            <input
              type="file"
              id="car-image"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
            <p className="text-sm text-gray-500">
              Upload a picture of your car
            </p>
          </label>
        </div>
        {/* CAR BRAND & MODEL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="flex flex-col-1 md:grid-cols-2 gap-6"></div>
            <div className="flex flex-col w-full">
              <label>Brand</label> 
              <input type="text" placeholder="e.g BMW, Mercedes, Audi..." required 
              className="px-3"/> 
            </div>  
        </div>
      </form>
    </div>
  );
};

export default AddCar;
