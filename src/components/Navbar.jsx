import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <nav className='flex justify-between mt-10  items-center bg-slate-300 p-5 '>
           <ul className='flex gap-4'>
            <li><Link href={'/'}>Home</Link></li>
            <li><Link href={'/destinations'}>Destinations</Link></li>
            <li><Link href={'/my-bookings'}>My Bookings</Link></li>
            </ul> 

            <div>
                <Image src ={'/assets/Wanderlast.png'} height={200} width={200} alt="Wanderlast Logo" />
            </div>

            <ul className='flex gap-4'>
            <li><Link href={'/profile'}>Profile</Link></li>
            <li><Link href={'/login'}>Login</Link></li>
            <li><Link href={'/sign-up'}>Sign Up</Link></li>
            </ul> 

        </nav>
    );
};

export default Navbar;