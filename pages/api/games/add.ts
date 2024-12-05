import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, price, imageUrl } = req.body;

    if (!name || !price || !imageUrl) {
      return res.status(400).json({ message: "Invalid data." });
    }

    try {
      const newGame = await prisma.game.create({
        data: { name, price: parseFloat(price), imageUrl },
      });
      res.status(201).json(newGame);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to add game." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
