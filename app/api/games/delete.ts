import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    try {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Game ID is required.' });
      }

      // ลบเกมออกจากฐานข้อมูล
      await prisma.game.delete({
        where: { id: parseInt(id, 10) },
      });

      res.status(200).json({ message: 'Game deleted successfully.' });
    } catch (error) {
      console.error('Error deleting game:', error);
      res.status(500).json({ error: 'Failed to delete game.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}
