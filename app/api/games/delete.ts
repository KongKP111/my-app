import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Request Body:', req.body);

  if (req.method === 'DELETE') {
    try {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'ID is required.' });
      }

      await prisma.game.delete({
        where: { id: parseInt(id) },
      });

      res.status(200).json({ message: 'Game deleted successfully.' });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error deleting game:', error.message);
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred.' });
      }
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}
