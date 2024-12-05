"use client";

import { useState } from "react";

const images = [
  "https://image.api.playstation.com/vulcan/ap/rnd/202207/2509/85p2Dwh5iDhUzRKe40QeNYh3.png",
  "https://image.api.playstation.com/vulcan/img/rnd/202010/2217/p3pYq0QxntZQREXRVdAzmn1w.png",
  "https://media.graphassets.com/hMpRcNy0RhyN3eCinBMb",
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
