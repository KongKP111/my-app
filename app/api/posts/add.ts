import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { gamename, price, imageUrl } = req.body;

    if (!gamename || !price || !imageUrl) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    try {
      const post = await prisma.post.create({
        data: {
          gamename,
          price: parseFloat(price),
          imageUrl,
        },
      });
      res.status(201).json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating post." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}

