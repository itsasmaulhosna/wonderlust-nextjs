"use client";

import { authClient } from "@/lib/auth-client";
import {AlertDialog, Button} from "@heroui/react";
import { FaTrash } from "react-icons/fa";

export function BookingCancel({bookingId}) {
    const handleCancleBooking =async()=>{
      const {data:tokenData}=await authClient.token()
                console.log(tokenData)
        const res =await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${bookingId}`,{
            method: 'DELETE',
            headers:{
                'Content-Type':'application/json',
                authorization:`Bearer ${tokenData?.token}`,
            }
        })
        const data =await res.json();
        window.location.reload();
    }
  return (
    <AlertDialog>
      <Button className="
            flex items-center gap-2
            bg-red-500 hover:bg-red-600
            text-white
            text-sm
            font-medium
            px-4 py-2
            rounded-xl
            transition-all duration-300

            
          ">
            <FaTrash className="text-sm" />
            Cancel
          </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Cancel booking permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently cancel <strong>My Awesome Project</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              
              <Button onClick={handleCancleBooking} slot="close" variant="danger">
                Cancle Booking
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}