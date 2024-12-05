import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../utils/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "DELETE") {
    await prisma.post.delete({
      where: { id: Number(id) },
    });

    return res.status(204).end();
  }
  return res.status(405).json({ message: "Method not allowed." });
}
