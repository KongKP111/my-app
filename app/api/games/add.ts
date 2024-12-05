import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { name, price, imageUrl } = req.body;

      // ตรวจสอบว่าฟิลด์ครบหรือไม่
      if (!name || !price || !imageUrl) {
        return res.status(400).json({ error: 'All fields are required: name, price, imageUrl.' });
      }

      const newGame = await prisma.game.create({
        data: {
          name, // ใช้ 'name' ตาม Schema
          price: parseFloat(price),
          imageUrl,
        },
      });

      res.status(200).json(newGame);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error adding game:', error.message);
        res.status(500).json({ error: 'Failed to add game.', details: error.message });
      } else {
        res.status(500).json({ error: 'Unknown error occurred.' });
      }
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}
