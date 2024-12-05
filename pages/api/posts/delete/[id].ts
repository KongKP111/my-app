import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;

      if (!id || Array.isArray(id)) {
        return res.status(400).json({ error: 'Invalid ID.' });
      }

      await prisma.post.delete({
        where: { id: parseInt(id) },
      });

      res.status(200).json({ message: 'Post deleted successfully.' });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error deleting post:', error.message);
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred.' });
      }
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}
