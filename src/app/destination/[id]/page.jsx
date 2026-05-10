import Image from "next/image";
import React from "react";
import { FaMapMarkerAlt, FaStar, FaEdit } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { MdOutlineAttachMoney } from "react-icons/md";
import { EditModal, FormModal } from "@/components/EditModal";
import { DeleteAlert } from "@/components/DeleteAlert";


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
    _id
  } = destination;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-white to-slate-100 pb-16">
      {/* Overlay Buttons */}

      {/* Top Image */}
      <div className="relative w-full flex justify-center pt-8 px-4">
        <div className="absolute top-5 right-10 z-20 flex items-center gap-3">
  <EditModal destination={destination} />
  <DeleteAlert destination={destination}/>
</div>
        <div className="relative w-full max-w-6xl h-[420px] md:h-[520px] rounded-[40px] overflow-hidden shadow-2xl">
          
          <Image
            src={imageUrl}
            alt={destinationName}
            fill
            priority
            className="object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30"></div>

          

          {/* Image Bottom Content */}
          <div className="absolute bottom-8 left-6 md:left-10 text-white z-10">
            
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium mb-4">
              <FaStar className="text-yellow-400" />
              Premium Destination
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              {destinationName}
            </h1>

            <div className="flex items-center gap-3 mt-4 text-lg">
              <FaMapMarkerAlt className="text-red-400 text-xl" />
              <span>{country}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="max-w-5xl mx-auto px-5 mt-12">
        
        {/* Duration */}
        <div className="flex items-center gap-5 border-b border-gray-200 py-8">
          
          <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
            <CiCalendarDate className="text-4xl text-blue-600" />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              Tour Duration
            </h3>

            <p className="text-gray-600 mt-1 text-lg">
              {duration} Days Trip
            </p>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center gap-5 border-b border-gray-200 py-8">
          
          <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center">
            <MdOutlineAttachMoney className="text-4xl text-green-600" />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-900">
              Package Price
            </h3>

            <p className="text-3xl font-extrabold text-gray-900 mt-1">
              ${price}
            </p>
          </div>
        </div>

        {/* About */}
        <div className="py-10">
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            About Destination
          </h2>

          <p className="text-lg leading-9 text-gray-600">
            Discover the beauty of{" "}
            <span className="font-semibold text-gray-900">
              {destinationName}
            </span>
            , one of the most breathtaking travel destinations in{" "}
            {country}. Enjoy unforgettable experiences, luxury stays,
            beautiful landscapes, local culture, delicious food, and exciting
            adventures during your amazing {duration}-day journey.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-5 mt-4">
          
          <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-lg hover:scale-105 transition-all duration-300">
            Book Now
          </button>

          <button className="px-8 py-4 rounded-2xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-all duration-300">
            Add Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailsPage;