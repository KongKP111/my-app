import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { title, content } = req.body;

    const post = await prisma.post.create({
      data: {
        title,
        content,
      },
    });

    return res.status(201).json(post);
  }
  return res.status(405).json({ message: "Method not allowed." });
}
