"use client";

import { useState } from "react";

const images = [
  "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/349040/header_thai.jpg?t=1703080866",
  "https://images.squarespace-cdn.com/content/v1/5fbc4a62c2150e62cfcb09aa/1662077989441-6V5D9YCJD018NAXP62M0/d20220518_TLOUX_SocialAssets_T1X_-Annouce_16x9.jpg?format=1000w",
  "https://rukminim2.flixcart.com/image/850/1000/xif0q/code-in-the-box-game/q/e/d/pc-marvel-s-spider-man-remastered-edition-original-imaggg2zs7dhqsff.jpeg?q=90&crop=false",
];

export default function HomePage() {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => setCurrentImage((currentImage + 1) % images.length);
  const prevImage = () => setCurrentImage((currentImage - 1 + images.length) % images.length);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-green-900 to-black p-4">
      <div className="w-full max-w-2xl bg-gradient-to-br from-green-950/70 to-black/70 rounded-xl shadow-2xl border border-green-800/50 overflow-hidden">
        <div className="bg-gradient-to-r from-green-950 to-black text-white p-6 text-center">
          <h1 className="text-3xl font-extrabold text-green-400">GameGank</h1>
        </div>
        
        <div className="relative w-full h-[500px] overflow-hidden">
          <img 
            src={images[currentImage]} 
            alt={`Slide ${currentImage + 1}`} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex justify-between items-center px-4">
            <button 
              onClick={prevImage} 
              className="bg-green-900/50 text-green-200 p-3 rounded-full hover:bg-green-800/70 transition-colors"
            >
              {"<"}
            </button>
            <button 
              onClick={nextImage} 
              className="bg-green-900/50 text-green-200 p-3 rounded-full hover:bg-green-800/70 transition-colors"
            >
              {">"}
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="text-center mb-6">
            <p className="text-xl text-green-300 mb-4">Ready to Dive In?</p>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={() => window.location.href = '/auth/login'}
                className="w-full max-w-xs px-6 py-3 bg-green-800 text-green-200 rounded-lg hover:bg-green-700 transition-colors"
              >
                Login
              </button>
              <button 
                onClick={() => window.location.href = '/auth/register'}
                className="w-full max-w-xs px-6 py-3 bg-green-900 text-green-300 rounded-lg hover:bg-green-800 transition-colors"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}