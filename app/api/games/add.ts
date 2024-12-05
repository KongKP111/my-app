import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { gamename, price, imageUrl } = req.body;  // Changed 'name' to 'gamename'

    if (!gamename || !price || !imageUrl) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    try {
      // Create a new game in the database
      const newGame = await prisma.game.create({
        data: {
          gamename,  // Use 'gamename' instead of 'name'
          price,
          imageUrl,
        },
      });

      // Send back the created game
      res.status(201).json(newGame);
    } catch (error) {
      console.error("Error creating game:", error);
      res.status(500).json({ message: "Failed to create game" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
