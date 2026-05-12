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

import { useRouter } from 'next/navigation';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';

const LoginPage = () => {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    });

    if (data) {
      router.push('/');
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
            Login to Your Account
          </h1>

          <p className="text-gray-600">
            Welcome back! Please login to continue.
          </p>
        </div>

        {/* Form */}
        <Form onSubmit={onSubmit} className="flex flex-col gap-5">

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

              return null;
            }}
          >
            <Label>Password</Label>

            <Input placeholder="Enter your password" />

            <Description>
              Enter your account password
            </Description>

            <FieldError />
          </TextField>

          {/* Button */}
          <Button
            className="w-full bg-cyan-500 text-white font-semibold"
            type="submit"
          >
            <Check />
            Login
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

export default LoginPage;