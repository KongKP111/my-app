import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    const { id, name, price, imageUrl } = req.body;

    try {
      const updatedGame = await prisma.game.update({
        where: { id: Number(id) },
        data: { name, price: Number(price), imageUrl },
      });
      res.status(200).json(updatedGame);
    } catch (error) {
      console.error("Error updating game:", error);
      res.status(500).json({ error: "Failed to update game." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
