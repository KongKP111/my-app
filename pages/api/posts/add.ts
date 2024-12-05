import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { title, content } = req.body;

      if (!title) {
        return res.status(400).json({ error: 'Title is required.' });
      }

      const newPost = await prisma.post.create({
        data: {
          title,
          content,
        },
      });

      res.status(200).json(newPost);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error adding post:', error.message);
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred.' });
      }
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
}
