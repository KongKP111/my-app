import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { gamename, price, imageUrl } = req.body;

    try {
      const newPost = await prisma.post.create({
        data: { gamename, price: parseFloat(price), imageUrl },
      });
      res.status(200).json(newPost);
    } catch (error) {
      console.error("Add Post Error:", error);
      res.status(500).json({ error: "Failed to add post" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
