import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    const { id } = req.query;

    try {
      const deletedGame = await prisma.game.delete({
        where: { id: Number(id) },
      });
      res.status(200).json(deletedGame);
    } catch (error) {
      console.error("Error deleting game:", error);
      res.status(500).json({ error: "Failed to delete game." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
