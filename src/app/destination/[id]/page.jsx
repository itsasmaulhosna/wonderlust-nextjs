import Image from "next/image";
import React from "react";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { MdOutlineAttachMoney } from "react-icons/md";

const DestinationDetailsPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:5000/destination/${id}`, {
    cache: "no-store",
  });

  const destination = await res.json();

  const {
    imageUrl,
    destinationName,
    country,
    price,
    duration,
    _id,
  } = destination;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          {/* Image */}
          <div className="overflow-hidden rounded-3xl shadow-2xl group">
            <Image
              src={imageUrl}
              alt={destinationName}
              width={800}
              height={600}
              className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>

          {/* Content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-5">
              <FaStar />
              Premium Destination
            </div>

            <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
              {destinationName}
            </h1>

            {/* Country */}
            <div className="flex items-center gap-3 mt-5 text-gray-600 text-lg">
              <FaMapMarkerAlt className="text-red-500 text-2xl" />
              <span>{country}</span>
            </div>

            {/* Duration */}
            <div className="flex items-center gap-3 mt-4 text-gray-600 text-lg">
              <CiCalendarDate className="text-blue-500 text-2xl" />
              <span>{duration} Days Tour</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mt-4 text-gray-600 text-lg">
              <MdOutlineAttachMoney className="text-green-500 text-3xl" />
              <span className="font-bold text-3xl text-gray-900">
                ${price}
              </span>
            </div>

            {/* Description */}
            <p className="mt-6 text-gray-600 leading-8 text-lg">
              Discover the beauty of{" "}
              <span className="font-semibold text-gray-800">
                {destinationName}
              </span>
              , one of the most breathtaking travel destinations in{" "}
              {country}. Enjoy unforgettable experiences, amazing landscapes,
              luxury accommodations, and exciting adventures during your{" "}
              {duration}-day trip.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-lg hover:scale-105 transition-all duration-300">
                Book Now
              </button>

              <button className="px-8 py-4 rounded-2xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-all duration-300">
                Add Wishlist
              </button>
            </div>
          </div>
        </div>

        {/* Extra Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Attractions
            </h3>
            <p className="text-gray-600 leading-7">
              Explore beautiful landscapes, famous landmarks, beaches,
              mountains, and cultural attractions.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Accommodation
            </h3>
            <p className="text-gray-600 leading-7">
              Stay in premium hotels and resorts with modern facilities and
              comfortable environments.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Travel Tips
            </h3>
            <p className="text-gray-600 leading-7">
              Best time to visit, local food recommendations, safety guidance,
              and essential travel information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailsPage;