import { NextApiRequest, NextApiResponse } from 'next';
import  prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    try {
      const { id, name, price, imageUrl } = req.body;

      if (!id || !name || !price || !imageUrl) {
        return res.status(400).json({ error: 'All fields are required.' });
      }

      const updatedGame = await prisma.game.update({
        where: { id: parseInt(id) },
        data: { name, price, imageUrl },
      });

      res.status(200).json(updatedGame);
    } catch (error) {
      res.status(500).json({ error: 'Failed to edit game.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}
