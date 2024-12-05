"use client";

import { useEffect, useState } from "react";

interface Game {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<Game[]>([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("");

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
  }, []);

  const totalPrice = cart.reduce(
    (total, game) => total + game.price * (game.quantity || 1),
    0
  );

  const handlePaymentSelection = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (!selectedPaymentMethod) {
      alert("Please select a payment method before proceeding.");
      return;
    }

    // Retrieve previous purchases
    const previousPurchases = JSON.parse(localStorage.getItem("purchases") || "[]");

    // Merge current cart into previous purchases
    const updatedPurchases = [...previousPurchases, ...cart];

    // Save updated purchases to localStorage
    localStorage.setItem("purchases", JSON.stringify(updatedPurchases));

    // Clear the cart
    setCart([]);
    localStorage.removeItem("cart");

    alert(`Payment successful via ${selectedPaymentMethod}! Your purchases have been added to the library.`);
    window.location.href = "/library"; // Redirect to the Library Page
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8">Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="space-y-4">
            {cart.map((game) => (
              <li key={game.id} className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg">
                <div className="flex items-center space-x-4">
                  <img
                    src={game.imageUrl}
                    alt={game.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div>
                    <p className="font-semibold text-lg">{game.name}</p>
                    {game.quantity > 1 && (
                      <p className="text-sm text-gray-500">Quantity: x{game.quantity}</p>
                    )}
                  </div>
                </div>
                <p className="text-lg font-semibold">
                  ${(game.price * (game.quantity || 1)).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
          <h2 className="text-xl font-bold mt-8">Total: ${totalPrice.toFixed(2)}</h2>

          <h3 className="text-lg font-semibold mt-6">Select Payment Method</h3>
          <div className="mt-4 flex gap-4">
            <button
              onClick={() => handlePaymentSelection("PromptPay")}
              className={`py-2 px-4 rounded ${
                selectedPaymentMethod === "PromptPay"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              PromptPay
            </button>
            <button
              onClick={() => handlePaymentSelection("PayPal")}
              className={`py-2 px-4 rounded ${
                selectedPaymentMethod === "PayPal"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              PayPal
            </button>
            <button
              onClick={() => handlePaymentSelection("TrueMoney")}
              className={`py-2 px-4 rounded ${
                selectedPaymentMethod === "TrueMoney"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              TrueMoney
            </button>
          </div>

          <button
            onClick={handleCheckout}
            className="mt-6 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
          >
            Finish Payment
          </button>
        </div>
      )}
    </main>
  );
}
