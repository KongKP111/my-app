import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    const { id, name, price, imageUrl } = req.body;

    if (!id || !name || !price || !imageUrl) {
      return res.status(400).json({ message: "Invalid data." });
    }

    try {
      const updatedGame = await prisma.game.update({
        where: { id: parseInt(id) },
        data: { name, price: parseFloat(price), imageUrl },
      });
      res.status(200).json(updatedGame);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to edit game." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
