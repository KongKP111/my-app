"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState({ username: "", email: "" });

  // Load user data from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUsername = localStorage.getItem("username");
      const savedEmail = localStorage.getItem("email");

      if (savedUsername && savedEmail) {
        setUser({
          username: savedUsername,
          email: savedEmail,
        });
      }
    }
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="bg-white shadow-md p-4">
      <nav className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <a href="/" className="text-lg font-bold">Home</a>
          <a href="#" className="text-lg">About Us</a>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={() => alert("Cart feature in progress!")}>🛒 Cart</button>

          {/* User Greeting */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-lg font-bold text-blue-600"
            >
              Hello: {user.username}
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-48">
                <Link href="/library">
                  <a className="block px-4 py-2 text-gray-800">Library</a>
                </Link>
                <button
                  onClick={() => alert("Logging out...")}
                  className="block px-4 py-2 text-red-500 w-full text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
