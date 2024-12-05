import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    const { id } = req.query;

    try {
      await prisma.post.delete({ where: { id: parseInt(id as string, 10) } });
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      console.error("Delete Post Error:", error);
      res.status(500).json({ error: "Failed to delete post" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
