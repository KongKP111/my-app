import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, price, imageUrl } = req.body;

    try {
      const newGame = await prisma.game.create({
        data: { name, price: Number(price), imageUrl },
      });
      res.status(201).json(newGame);
    } catch (error) {
      console.error("Error adding game:", error);
      res.status(500).json({ error: "Failed to add game." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
