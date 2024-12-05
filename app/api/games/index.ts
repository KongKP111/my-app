import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const games = await prisma.game.findMany({
        select: {
          id: true,
          name: true,
          price: true,
          imageUrl: true,
        },
      });
      res.status(200).json(games); // ตรวจสอบว่าข้อมูลที่ส่งตรงกับ Game[]
    } catch (error) {
      console.error('Error fetching games:', error);
      res.status(500).json({ error: 'Failed to fetch games.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}
