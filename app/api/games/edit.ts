import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    try {
      const { id, name, price, imageUrl } = req.body;

      // Validate required fields
      if (!id || !name || !price || !imageUrl) {
        return res.status(400).json({ error: 'All fields are required: id, name, price, imageUrl.' });
      }

      const updatedGame = await prisma.game.update({
        where: { id },
        data: {
          name,
          price: parseFloat(price),
          imageUrl,
        },
      });

      res.status(200).json(updatedGame);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error editing game:', error.message);
        res.status(500).json({ error: 'Failed to edit game.', details: error.message });
      } else {
        res.status(500).json({ error: 'Unknown error occurred.' });
      }
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}
