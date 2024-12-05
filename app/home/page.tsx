"use client";

import Carousel from "./_component/Carousel";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to gamegank</h1>
      <Carousel />
      <div className="mt-8 border p-4 rounded-md bg-white shadow-md">
        <p className="mb-4">Please Login or Register</p>
        <div className="flex space-x-4">
          <Link href="/auth/login">
            <button className="px-4 py-2 bg-blue-500 text-white rounded">
              Login
            </button>
          </Link>
          <Link href="/auth/register">
            <button className="px-4 py-2 bg-green-500 text-white rounded">
              Register
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
