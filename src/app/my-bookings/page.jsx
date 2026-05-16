import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import React from "react";

import {
  FaCalendarAlt,
  FaMoneyBillWave,
  FaEye,
  FaTrash,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { MdTravelExplore } from "react-icons/md";
import { HiOutlineTicket } from "react-icons/hi";
import { BookingCancel } from "@/components/BookingCancle";
import { authClient } from "@/lib/auth-client";

const MyBookingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  
  const {data:tokenData}=await authClient.token()
          console.log(tokenData)
const token =await auth.api.getToken({
    headers:await headers()
  })
  console.log(token)
  const user = session?.user;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${user?.id}`,
    {
      headers:{
        authorization:`Bearer${token}`
      }
    }
  );

  const bookings = await res.json();

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      
      {/* Heading */}
      <div className="text-center mb-14">
        
        <h1 className="text-4xl font-extrabold text-gray-900">
          My Bookings
        </h1>

        <p className="text-gray-600 mt-4 max-w-3xl mx-auto leading-8">
          Manage all your travel bookings in one place.
        </p>
      </div>

      {/* Booking Cards */}
      <div className="space-y-6">
  {bookings.map((booking) => (
    <div
      key={booking._id}
      className="
        w-full
        border border-gray-200
        rounded-3xl
        bg-white
        shadow-sm
        overflow-hidden
        flex flex-col lg:flex-row
      "
    >
      {/* LEFT IMAGE */}
      <div className="relative lg:w-[320px] w-full h-[240px] shrink-0">
        
        <Image
          src={booking.imageUrl}
          alt={booking.destinationName}
          fill
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/10"></div>

        {/* Badge */}
        <div className="absolute top-4 left-4">
          
          <div className="
            flex items-center gap-2
            bg-emerald-500
            text-white
            px-3 py-1.5
            rounded-full
            text-sm
            shadow-md
          ">
            <MdTravelExplore className="text-base" />
            <span>Confirmed</span>
          </div>
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div className="flex-1 px-5 py-4 flex flex-col justify-between">
        
        {/* TOP */}
        <div>
          
          {/* Title */}
          <h1 className="text-3xl font-bold text-gray-900">
            {booking.destinationName}
          </h1>

          {/* Country */}
          <div className="flex items-center gap-2 mt-2 text-gray-500">
            
            <FaMapMarkerAlt className="text-cyan-500" />

            <span>{booking.country}</span>
          </div>

          {/* INFO */}
          <div className="
            mt-6
            flex flex-col md:flex-row
            md:items-center
            gap-5 md:gap-10
            flex-wrap
          ">
            
            {/* Departure */}
            <div className="flex items-center gap-3">
              
              <FaCalendarAlt className="text-cyan-500 text-lg" />

              <div>
                <p className="text-xs text-gray-500">
                  Departure
                </p>

                <h3 className="font-semibold text-gray-800">
                  {new Date(
                    booking.departureDate
                  ).toDateString()}
                </h3>
              </div>
            </div>

            {/* Booking ID */}
            <div className="flex items-center gap-3">
              
              <HiOutlineTicket className="text-violet-500 text-xl" />

              <div>
                <p className="text-xs text-gray-500">
                  Booking ID
                </p>

                <h3 className="font-semibold text-gray-800">
                  #{booking._id.slice(0, 10)}
                </h3>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              
              <FaMoneyBillWave className="text-green-500 text-lg" />

              <div>
                <p className="text-xs text-gray-500">
                  Price
                </p>

                <h2 className="text-2xl font-bold text-gray-900">
                  ${booking.price}
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="
          flex items-center
          justify-end
          gap-3
          mt-6
        ">
          
          {/* Cancel */}
          <BookingCancel bookingId={booking._id} />

          {/* View */}
          <button className="
            flex items-center gap-2
            border border-cyan-500
            text-cyan-600
            hover:bg-cyan-500
            hover:text-white
            text-sm
            font-medium
            px-4 py-2
            rounded-xl
            transition-all duration-300
          ">
            <FaEye className="text-sm" />
            View
          </button>
        </div>
      </div>
    </div>
  ))}
</div>
    </div>
  );
};

export default MyBookingPage;