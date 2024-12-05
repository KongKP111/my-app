import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    const { id, title, content } = req.body;
    try {
      const post = await prisma.post.update({
        where: { id: parseInt(id, 10) },
        data: { title, content },
      });
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to update post" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
