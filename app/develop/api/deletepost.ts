import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    const { id } = req.query;
    try {
      await prisma.post.delete({
        where: { id: parseInt(id as string, 10) },
      });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete post" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
