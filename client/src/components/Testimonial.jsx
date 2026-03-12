import React from "react";
import Title from "./Title";
import { assets } from "../assets/assets";

const Testimonial = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sanika Patil",
      location: "Sangli, Maharashtra",
      image: assets.testimonial_image_1,
      testimonial: "Outstanding service! The booking process was seamless and the car was in perfect condition. Highly recommend for anyone looking for reliable car rental.",
      rating: 5
    },
    {
      id: 2,
      name: "Sakshi Deshmukh",
      location: "Satara, Maharashtra",
      image: assets.testimonial_image_2,
      testimonial: "Excellent experience from start to finish. The team was professional and the vehicle exceeded my expectations. Will definitely book again!",
      rating: 5
    },
    {
      id: 3,
      name: "Samruddhi Jadhav",
      location: "Kolhapur, Maharashtra",
      image: assets.testimonial_image_1,
      testimonial: "Fantastic service with great attention to detail. The entire process was smooth and hassle-free. Truly a premium car rental experience!",
      rating: 4
    },
  ];

  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }, (_, index) => (
          <svg
            key={index}
            width="16"
            height="15"
            viewBox="0 0 16 15"
            fill={index < rating ? "#5044E5" : "#E5E7EB"}
            xmlns="http://www.w3.org/2000/svg"
            className="transition-colors duration-200"
          >
            <path
              d="M7.04894 0.92705C7.3483 0.00573921 8.6517 0.00573969 8.95106 0.92705L10.0206 4.21885C10.1545 4.63087 10.5385 4.90983 10.9717 4.90983H14.4329C15.4016 4.90983 15.8044 6.14945 15.0207 6.71885L12.2205 8.75329C11.87 9.00793 11.7234 9.4593 11.8572 9.87132L12.9268 13.1631C13.2261 14.0844 12.1717 14.8506 11.388 14.2812L8.58778 12.2467C8.2373 11.9921 7.7627 11.9921 7.41221 12.2467L4.61204 14.2812C3.82833 14.8506 2.77385 14.0844 3.0732 13.1631L4.14277 9.87132C4.27665 9.4593 4.12999 9.00793 3.7795 8.75329L0.979333 6.71885C0.195619 6.14945 0.598395 4.90983 1.56712 4.90983H5.02832C5.46154 4.90983 5.8455 4.63087 5.97937 4.21885L7.04894 0.92705Z"
            />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <Title
          title="What Our Customers Say"
          subTitle="Hear from our valued customers across Maharashtra about their exceptional car rental experiences."
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group p-8 rounded-2xl bg-white shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 cursor-pointer hover:-translate-y-2"
            >
              <div className="mb-6">
                <StarRating rating={testimonial.rating} />
              </div>
              <div className="relative">
                <svg
                  className="absolute -top-2 -left-2 w-6 h-6 text-purple-100"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                </svg>
                <p className="text-gray-600 text-lg leading-relaxed italic pl-4">
                  "{testimonial.testimonial}"
                </p>
              </div>

              <hr className="my-6 border-gray-200" />
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={testimonial.image}
                    className="w-14 h-14 object-cover rounded-full border-2 border-white shadow-sm"
                    alt={testimonial.name}
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-purple-500 rounded-full border-2 border-white flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg">{testimonial.name}</h3>
                  <p className="text-gray-500 text-sm">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;