import { NextApiRequest, NextApiResponse } from 'next';
import  prisma  from '@/lib/prisma';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    if (req.method === 'POST') {
      // Handle adding a game
      res.status(200).json({ message: 'Game added successfully' });
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
}
