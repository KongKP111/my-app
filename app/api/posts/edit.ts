import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    const { id, gamename, price, imageUrl } = req.body;

    try {
      const updatedPost = await prisma.post.update({
        where: { id },
        data: { gamename, price: parseFloat(price), imageUrl },
      });
      res.status(200).json(updatedPost);
    } catch (error) {
      console.error("Edit Post Error:", error);
      res.status(500).json({ error: "Failed to edit post" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
