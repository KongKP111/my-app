"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Game {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

export default function StorePage() {
  const [games, setGames] = useState<Game[]>([]);
  const [cart, setCart] = useState<Game[]>([]);
  const [username, setUsername] = useState<string>("Guest");
  const [showDropdown, setShowDropdown] = useState<boolean>(false); // Properly declared

  useEffect(() => {
    const fetchGames = async () => {
      const res = await fetch("/api/games");
      const data: Game[] = await res.json();
      setGames(data);
    };
    fetchGames();

    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);

    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (game: Game) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      const gameExists = newCart.some((item) => item.id === game.id);
      if (!gameExists) {
        newCart.push(game);
      }
      return newCart;
    });
  };

  const handleLogout = () => {
    setCart([]);
    localStorage.removeItem("cart");
    localStorage.removeItem("username");
    alert("Logging out... Redirecting to Home");
    window.location.href = "/";
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-lg p-4 sticky top-0 z-50">
        <nav className="flex justify-between items-center container mx-auto">
          <div className="flex items-center space-x-6">
            <Link href="/store" className="text-xl font-bold text-gray-800 hover:text-blue-500 transition duration-300">
              Home
            </Link>
            <Link href="#" className="text-lg text-gray-600 hover:text-blue-500 transition duration-300">
              About Us
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative text-xl text-gray-800 hover:text-blue-500 transition duration-300">
              🛒 Cart
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 text-sm bg-red-500 text-white rounded-full px-2 py-1">{cart.length}</span>
              )}
            </Link>
            <div className="relative">
              <button className="text-lg text-gray-800" onClick={toggleDropdown}>
                Hello, {username}
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-4">
                  <Link href="/library" className="block mb-2 text-sm text-gray-800 hover:text-blue-500">
                    My Library
                  </Link>
                  <Link href="/previous-purchases" className="block mb-2 text-sm text-gray-800 hover:text-blue-500">
                    Previous Purchases
                  </Link>
                  <button className="w-full text-red-500 hover:text-red-700" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

      <section className="p-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">Store</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <div key={game.id} className="bg-white shadow-xl rounded-lg overflow-hidden transition-transform transform hover:scale-105">
              <img src={game.imageUrl} alt={game.name} className="w-full h-64 object-cover rounded-t-lg" />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{game.name}</h2>
                <p className="text-lg text-gray-600 mb-4">Price: ${game.price}</p>
                <button
                  className="w-full bg-blue-600 text-white py-2 rounded-lg text-lg hover:bg-blue-700 transition duration-200"
                  onClick={() => addToCart(game)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
