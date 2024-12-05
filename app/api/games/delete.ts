import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ message: "ID is required." });
      }

      await prisma.game.delete({
        where: { id: parseInt(id as string) },
      });

      return res.status(200).json({ message: "Game deleted successfully." });
    } catch (error) {
      console.error("Error deleting game:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed." });
  }
}
