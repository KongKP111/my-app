import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const games = await prisma.game.findMany();
      res.status(200).json(games);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch games" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
