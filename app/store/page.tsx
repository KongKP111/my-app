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
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  // Fetch games and load cart and username from localStorage
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch("/api/games");
        if (!res.ok) {
          throw new Error("Failed to fetch games");
        }
        const data: Game[] = await res.json();
        setGames(data);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();

    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);

    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add a game to the cart
  const addToCart = (game: Game) => {
    setCart((prevCart) => {
      const gameExists = prevCart.some((item) => item.id === game.id);
      if (!gameExists) {
        return [...prevCart, game];
      }
      return prevCart;
    });
  };

  // Handle user logout
  const handleLogout = () => {
    setCart([]);
    localStorage.removeItem("cart");
    localStorage.removeItem("username");
    alert("Logging out... Redirecting to Home");
    window.location.href = "/";
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white">
      <header className="bg-black/70 backdrop-blur-md shadow-2xl p-4 sticky top-0 z-50">
        <nav className="flex justify-between items-center container mx-auto">
          <div className="flex items-center space-x-6">
            <Link
              href="/store"
              className="text-xl font-bold text-white hover:text-purple-400 transition duration-300 ease-in-out"
            >
              Home
            </Link>
            <Link
              href="#"
              className="text-lg text-gray-300 hover:text-purple-300 transition duration-300 ease-in-out"
            >
              About Us
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/cart"
              className="relative text-xl text-white hover:text-purple-400 transition duration-300 ease-in-out"
            >
              🛒 Cart
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 text-xs bg-purple-600 text-white rounded-full px-2 py-1 animate-pulse">
                  {cart.length}
                </span>
              )}
            </Link>
            <div className="relative">
              <button 
                className="text-lg text-white hover:text-purple-300 transition duration-300 ease-in-out" 
                onClick={toggleDropdown}
              >
                Hello, {username}
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 shadow-2xl rounded-lg p-4 border border-purple-800/50">
                  <Link
                    href="/library"
                    className="block mb-2 text-sm text-gray-200 hover:text-purple-300 transition duration-300 ease-in-out"
                  >
                    My Library
                  </Link>
                  <Link
                    href="/previous-purchases"
                    className="block mb-2 text-sm text-gray-200 hover:text-purple-300 transition duration-300 ease-in-out"
                  >
                    Previous Purchases
                  </Link>
                  <button
                    className="w-full text-red-400 hover:text-red-600 text-left transition duration-300 ease-in-out"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

      <section className="p-8">
        <h1 className="text-4xl font-extrabold text-white mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
          Game Store
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <div
              key={game.id}
              className="bg-gray-800/70 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden 
              transition-all duration-500 ease-in-out transform 
              hover:scale-105 hover:shadow-purple-900/50 hover:border-purple-700 
              border border-transparent"
            >
              <div className="relative overflow-hidden">
                <img
                  src={game.imageUrl}
                  alt={game.name}
                  className="w-full h-64 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-white mb-2 truncate">
                  {game.name}
                </h2>
                <p className="text-lg text-purple-300 mb-4">Price: ${game.price}</p>
                <button
                  className="w-full bg-purple-700 text-white py-2 rounded-lg text-lg 
                  hover:bg-purple-600 transition duration-300 ease-in-out 
                  transform active:scale-95 focus:outline-none 
                  focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
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