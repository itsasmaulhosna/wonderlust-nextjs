import Image from "next/image";
import React from "react";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { MdOutlineAttachMoney } from "react-icons/md";

import { EditModal } from "@/components/EditModal";
import { DeleteAlert } from "@/components/DeleteAlert";
import BookingCard from "@/components/BookingCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const DestinationDetailsPage = async ({ params }) => {
  const { id } =  params;

const session = await auth.api.getToken({
  headers: await headers(),
});

const realToken = session?.token;
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${id}`, {
    cache: "no-store",
    headers: {
    authorization: `Bearer ${realToken}`,
  },

  });

  const destination = await res.json();
console.log("desinations are",destination)
  const {
    imageUrl,
    destinationName,
    country,
    price,
    duration,
  } = destination;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-white to-slate-100 pb-16">
      
      {/* Hero Section */}
      <div className="relative w-full flex justify-center pt-8 px-4">
        
        {/* Action Buttons */}
        <div className="absolute top-2 right-2 z-20 flex items-center gap-3">
          <EditModal destination={destination} />
          <DeleteAlert destination={destination} />
        </div>

        <div className="relative w-full max-w-7xl h-[420px] md:h-[520px] rounded-[40px] overflow-hidden shadow-2xl">
          
          <Image
            src={imageUrl}
            alt={destinationName}
            fill
            priority
            className="object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Bottom Content */}
          <div className="absolute bottom-8 left-6 md:left-10 text-white z-10">
            
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium mb-4">
              <FaStar className="text-yellow-400" />
              Premium Destination
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold">
              {destinationName}
            </h1>

            <div className="flex items-center gap-3 mt-4 text-lg">
              <FaMapMarkerAlt className="text-red-400 text-xl" />
              <span>{country}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-5 mt-14 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Side */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-8">
          
          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Duration */}
            <div className="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
                <CiCalendarDate className="text-4xl text-blue-600" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Tour Duration
                </h3>

                <p className="text-gray-600 mt-1">
                  {duration} Days Trip
                </p>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl">
              <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center">
                <MdOutlineAttachMoney className="text-4xl text-green-600" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Package Price
                </h3>

                <p className="text-2xl font-extrabold text-gray-900 mt-1">
                  ${price}
                </p>
              </div>
            </div>
          </div>

          {/* Overview */}
          <div className="mt-10">
            
            <h2 className="text-3xl font-bold text-gray-900 mb-5">
              Overview
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
        </div>

        {/* Right Side Booking Card */}
        <div className="sticky top-10 h-fit">
          <BookingCard destination={destination} />
        </div>
      </div>
    </div>
  );
};

export default DestinationDetailsPage;