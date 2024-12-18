"use client";

import { RegisterForm } from "@/components/register/register-form";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#A020F0] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-white">
            Registration For SpringBoard UK Study Fair
          </h2>
          <p className="mt-2 text-sm text-white">
            Join us and start your StudyAbroad journey!
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
}