"use client";

import { useState } from "react";

const images = [
  "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/349040/header_thai.jpg?t=1703080866",
  "https://images.squarespace-cdn.com/content/v1/5fbc4a62c2150e62cfcb09aa/1662077989441-6V5D9YCJD018NAXP62M0/d20220518_TLOUX_SocialAssets_T1X_-Annouce_16x9.jpg?format=1000w",
  "https://rukminim2.flixcart.com/image/850/1000/xif0q/code-in-the-box-game/q/e/d/pc-marvel-s-spider-man-remastered-edition-original-imaggg2zs7dhqsff.jpeg?q=90&crop=false",
];

export default function Carousel() {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () =>
    setCurrentImage((currentImage + 1) % images.length);
  const prevImage = () =>
    setCurrentImage((currentImage - 1 + images.length) % images.length);

  return (
    <div className="w-full max-w-md flex flex-col items-center">
      <img
        src={images[currentImage]}
        alt={`Slide ${currentImage + 1}`}
        className="rounded-md shadow-lg"
      />
      <div className="flex justify-between mt-4 w-full">
        <button
          onClick={prevImage}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Prev
        </button>
        <button
          onClick={nextImage}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
