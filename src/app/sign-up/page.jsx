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
  Separator,
  TextField,
} from '@heroui/react';
import { redirect } from 'next/navigation';

import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const SignUppage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
      image: user.image,
    });

    if (data) {
      redirect('/');
    }

    if (error) {
      alert(error.message);
    }
  };
  const handleGoogleSignIn =async()=>{
    await authClient.signIn.social({
        provider:'google'
    })
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
          <TextField isRequired name="name">
            <Label>Name</Label>
            <Input placeholder="Enter your name" />
            <FieldError />
          </TextField>

          {/* Email */}
          <TextField isRequired name="email" type="email">
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>

          {/* Image */}
          <TextField isRequired name="image" type="url">
            <Label>Image URL</Label>
            <Input placeholder="https://example.com/photo.jpg" />
            <FieldError />
          </TextField>

          {/* Password */}
          <TextField isRequired name="password" type="password">
            <Label>Password</Label>
            <Input placeholder="Enter your password" />
            <Description>
              Must be at least 8 characters with 1 uppercase and 1 number
            </Description>
            <FieldError />
          </TextField>

          {/* Create Account Button */}
          <Button
            className="w-full bg-cyan-500 text-white font-semibold"
            type="submit"
          >
            <Check />
            Create Account
          </Button>
        </Form>

       {/* OR Divider */}
<div className="flex items-center gap-4 my-6">
  <div className="flex-1 h-px bg-gray-300" />
  <span className="text-sm text-gray-500 whitespace-nowrap">
    Or sign up with
  </span>
  <div className="flex-1 h-px bg-gray-300" />
</div>

{/* Google Button */}
<Button onClick={handleGoogleSignIn}
  variant="bordered"
  className="w-full flex items-center justify-center gap-3 py-6 border-gray-300 hover:bg-gray-50 transition"
>
  <FcGoogle className="text-xl" />
  <span className="font-medium">Continue with Google</span>
</Button>


      </Card>
    </div>
  );
};

export default SignUppage;