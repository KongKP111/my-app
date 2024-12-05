import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { gamename, price, imageUrl } = req.body;

    const post = await prisma.post.create({
      data: {
        gamename,
        price: parseFloat(price),
        imageUrl,
      },
    });

    return res.status(201).json(post);
  }
  return res.status(405).json({ message: "Method not allowed." });
}
