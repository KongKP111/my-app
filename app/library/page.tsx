"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Purchase {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function LibraryPage() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [user, setUser] = useState({ email: "", username: "" });

  useEffect(() => {
    // Load purchases from localStorage
    const savedPurchases = JSON.parse(localStorage.getItem("purchases") || "[]");
    setPurchases(savedPurchases);

    // Load user details
    const email = localStorage.getItem("email") || "Not logged in";
    const username = localStorage.getItem("username") || "Guest";
    setUser({ email, username });
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white p-8">
      <h1 className="text-4xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
        My Library
      </h1>
      <div className="mb-8 bg-gray-800/50 p-4 rounded-lg backdrop-blur-sm">
        <p className="text-lg text-purple-300">Email: {user.email}</p>
        <p className="text-lg text-purple-300">Username: {user.username}</p>
      </div>
      <h2 className="text-2xl font-bold mb-4 text-white">Previous Purchases</h2>
      {purchases.length === 0 ? (
        <p className="text-gray-400 italic">No purchases yet</p>
      ) : (
        <ul className="space-y-4">
          {purchases.map((purchase, index) => (
            <li
              key={index}
              className="p-4 border-2 border-purple-800/30 rounded-lg bg-gray-800/70 backdrop-blur-sm shadow-2xl hover:border-purple-600 transition duration-300"
            >
              <p className="font-semibold text-white text-lg mb-2">{purchase.name}</p>
              <p className="text-purple-300">Quantity: {purchase.quantity}</p>
              <p className="text-purple-300">
                Price: ${" "}
                {(purchase.price * (purchase.quantity || 1)).toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-8">
        <Link href="/store">
          <button 
            className="
              px-6 py-3 
              bg-gradient-to-r from-purple-600 to-purple-800 
              text-white 
              rounded-lg 
              shadow-2xl 
              hover:from-purple-700 hover:to-purple-900 
              transition duration-300 ease-in-out
              transform hover:scale-105 active:scale-95
              focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50
            "
          >
            Back to Store
          </button>
        </Link>
      </div>
    </main>
  );
}