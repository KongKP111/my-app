import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const posts = await prisma.post.findMany();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
