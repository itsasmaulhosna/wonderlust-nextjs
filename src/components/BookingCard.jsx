'use client';
import { authClient } from '@/lib/auth-client';
import { Button, Card, DateField, Label } from '@heroui/react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const BookingCard = ({destination}) => {
    const [departureDate,setDeparetureDate]=useState(null)
    const {data:session}=authClient.useSession();
        const user = session?.user; 
    
    const { price,_id,imageUrl,destinationName,country} = destination;

    const handleBooking =async()=>{
        const bookingData={
            userId:user?.id,
            userName:user?.name,
            userImage:user?.image,
            destinationId:_id,
            destinationName,
            country,
            price,
            imageUrl,
            departureDate:new Date(departureDate)

        }
        const res =await fetch('http://localhost:5000/booking',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(bookingData)
        })
        const data =await res.json();
        toast.success('Booking successful!')
    }
    return (
        <Card className='rounded-none border mt-4'>
            <h2 className='text-2xl font-bold text-gray-900 mb-5'>Book Your Trip</h2>
            <p className='text-gray-600 mb-5'>Experience the best of {destinationName} with our exclusive travel packages. Book now to secure your spot and create unforgettable memories!</p>
            <h2 className='text-3xl font-bold text-cyan-300'>${price}</h2>
                <p className='text-sm text-muted'>Per Person</p>
             <DateField onChange={setDeparetureDate} className="w-[256px]" name="date">
                
      <Label>Departure Date</Label>
      <DateField.Group>
        <DateField.Input>{(segment) => <DateField.Segment segment={segment} />}</DateField.Input>
      </DateField.Group>
    </DateField>
    <Button onClick={handleBooking} className={'w-full rounded-none bg-cyan-500'}>Book Now</Button>
            
        </Card>
    );
};

export default BookingCard;