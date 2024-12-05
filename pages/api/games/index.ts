import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const games = await prisma.game.findMany();
      res.status(200).json(games);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch games." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
