import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: "Game ID is required." });
    }

    try {
      await prisma.game.delete({ where: { id: parseInt(id as string) } });
      res.status(200).json({ message: "Game deleted successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to delete game." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
