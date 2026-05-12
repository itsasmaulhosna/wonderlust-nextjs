'use client';

import { authClient } from '@/lib/auth-client';
import { Check } from '@gravity-ui/icons';
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from '@heroui/react';
import { redirect, useRouter } from 'next/navigation';

import React from 'react';

const SignUppage = () => {
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData =new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());
        
const {data,error} =await authClient.signUp.email({
    email:user.email,
    password:user.password,
    name:user.name,
    image:user.image

})
if(data){
    redirect('/')
}
if(error){
    alert(error.message);
}
    }
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <Card className="w-full max-w-md p-8 shadow-xl rounded-2xl">
        
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3">
            Create Your Account
          </h1>

          <p className="text-gray-600">
            Join our community and start your journey today!
          </p>
        </div>

        {/* Form */}
        <Form onSubmit={onSubmit} className="flex flex-col gap-5">
          
          {/* Name */}
          <TextField
            isRequired
            name="name"
            validate={(value) => {
              if (value.length < 3) {
                return 'Name must be at least 3 characters';
              }
              return null;
            }}
          >
            <Label>Name</Label>
            <Input placeholder="Enter your name" />
            <FieldError />
          </TextField>

          {/* Email */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
              ) {
                return 'Please enter a valid email address';
              }
              return null;
            }}
          >
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>

          {/* Image URL */}
          <TextField
            isRequired
            name="image"
            type="url"
            validate={(value) => {
              try {
                new URL(value);
                return null;
              } catch {
                return 'Please enter a valid image URL';
              }
            }}
          >
            <Label>Image URL</Label>
            <Input placeholder="https://example.com/photo.jpg" />
            <FieldError />
          </TextField>

          {/* Password */}
          <TextField
            isRequired
            minLength={8}
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 8) {
                return 'Password must be at least 8 characters';
              }
              if (!/[A-Z]/.test(value)) {
                return 'Password must contain at least one uppercase letter';
              }
              if (!/[0-9]/.test(value)) {
                return 'Password must contain at least one number';
              }
              return null;
            }}
          >
            <Label>Password</Label>

            <Input placeholder="Enter your password" />

            <Description>
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>

            <FieldError />
          </TextField>

          {/* Button */}
          <Button
            className="w-full bg-cyan-500 text-white font-semibold"
            type="submit"
          >
            <Check />
            Create Account
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default SignUppage;