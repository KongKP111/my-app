import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../utils/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const posts = await prisma.post.findMany();
    return res.status(200).json(posts);
  }
  return res.status(405).json({ message: "Method not allowed." });
}
