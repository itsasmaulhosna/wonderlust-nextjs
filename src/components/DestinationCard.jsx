import Image from "next/image";
import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { FaExternalLinkAlt } from "react-icons/fa";
import Link from "next/link";

const DestinationCard = ({ destination }) => {
  const {
    imageUrl,
    destinationName,
    country,
    price,
    duration,
    _id,
  } = destination;

  return (
    <div className="group overflow-hidden rounded-3xl bg-white shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-2">
      
      {/* Image */}
      <div className="relative overflow-hidden">
        <Image
          src={imageUrl}
          alt={destinationName}
          width={500}
          height={350}
          className="h-[250px] w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-500"></div>

        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-gray-900 px-4 py-2 rounded-full text-sm font-bold shadow-md">
          ${price}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        
        {/* Country */}
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <FaMapMarkerAlt className="text-red-500" />
          <span>{country}</span>
        </div>

        {/* Title */}
        <h2 className="mt-2 text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
          {destinationName}
        </h2>

        {/* Duration */}
        <div className="flex items-center gap-2 mt-3 text-gray-600">
          <CiCalendarDate className="text-xl text-blue-500" />
          <span>{duration} Days Trip</span>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gray-200 my-4"></div>

        {/* Bottom */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Starting From</p>
            <h3 className="text-2xl font-bold text-gray-900">
              ${price}
            </h3>
          </div>

          <Link href={`/destination/${_id}`}>
            <button className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-300">
              Book Now <FaExternalLinkAlt />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;