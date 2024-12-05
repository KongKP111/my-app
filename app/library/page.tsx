"use client";

import { useEffect, useState } from "react";

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
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">My Library</h1>
      <div>
        <p>Email: {user.email}</p>
        <p>Username: {user.username}</p>
        <h2 className="text-2xl font-bold mt-4">Previous Purchases</h2>
        <ul>
          {purchases.map((purchase, index) => (
            <li key={index} className="border-b py-2">
              <p>{purchase.name}</p>
              <p>Quantity: {purchase.quantity}</p>
              <p>Price: ${(purchase.price * (purchase.quantity || 1)).toFixed(2)}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
