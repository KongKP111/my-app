import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const games = [
      { id: 1, name: "Game 1", price: 29.99, imageUrl: "https://via.placeholder.com/150" },
      { id: 2, name: "Game 2", price: 49.99, imageUrl: "https://via.placeholder.com/150" },
      { id: 3, name: "Game 3", price: 59.99, imageUrl: "https://via.placeholder.com/150" },
      { id: 4, name: "Game 4", price: 39.99, imageUrl: "https://via.placeholder.com/150" },
      { id: 5, name: "Game 5", price: 19.99, imageUrl: "https://via.placeholder.com/150" },
      { id: 6, name: "Game 6", price: 89.99, imageUrl: "https://via.placeholder.com/150" },
      { id: 7, name: "Game 7", price: 79.99, imageUrl: "https://via.placeholder.com/150" },
      { id: 8, name: "Game 8", price: 49.99, imageUrl: "https://via.placeholder.com/150" },
      { id: 9, name: "Game 9", price: 39.99, imageUrl: "https://via.placeholder.com/150" },
      { id: 10, name: "Game 10", price: 59.99, imageUrl: "https://via.placeholder.com/150" },
    ];
    res.status(200).json(games);
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
