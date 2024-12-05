import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    try {
      const { id, gamename, price, imageUrl } = req.body;

      if (!id || !gamename || !price || !imageUrl) {
        return res.status(400).json({ message: "Missing required fields." });
      }

      const updatedGame = await prisma.game.update({
        where: { id: parseInt(id) },
        data: { gamename, price: parseFloat(price), imageUrl },
      });

      return res.status(200).json(updatedGame);
    } catch (error) {
      console.error("Error updating game:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed." });
  }
}
