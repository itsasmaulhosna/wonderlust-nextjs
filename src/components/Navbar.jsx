'use client';
import { authClient } from '@/lib/auth-client';
import { Avatar, Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    const {data:session}=authClient.useSession();
    const user = session?.user; 

    const handleLogout =async()=>{
        await authClient.signOut()
    }
    return (
        <nav className='flex justify-between mt-10  items-center  p-5 '>
           <ul className='flex gap-4'>
            <li><Link href={'/'}>Home</Link></li>
            <li><Link href={'/destination'}>Destination</Link></li>
            <li><Link href={'/my-bookings'}>My Bookings</Link></li>
            <li><Link href={'/add-destination'}>Add Destination</Link></li>
            </ul> 

            <div>
                <Image src ={'/assets/Wanderlast.png'} height={200} width={200} alt="Wanderlast Logo" />
            </div>

            <ul className='flex gap-4'>
            <li><Link href={'/profile'}>Profile</Link></li>
            {user?<>
            <Avatar>
        <Avatar.Image alt="John Doe" src={user?.image} />
        <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
      </Avatar>
      <li>
<Button onClick={handleLogout} variant='danger' className={'rounded-none'}>Logout</Button>

      </li>
            </>
            :
            <>
            <li><Link href={'/login'}>Login</Link></li>
            <li><Link href={'/sign-up'}>Sign Up</Link></li>
            </>
            }
            </ul> 

        </nav>
    );
};

export default Navbar;