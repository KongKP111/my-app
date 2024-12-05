import { NextApiRequest, NextApiResponse } from 'next';
import  prisma  from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      console.log('Request Body:', req.body); // Log ข้อมูลที่ได้รับ
      const { name, price, imageUrl } = req.body;

      if (!name || !price || !imageUrl) {
        console.error('Validation Error: Missing fields.');
        return res.status(400).json({ error: 'All fields are required: name, price, imageUrl.' });
      }

      const newGame = await prisma.game.create({
        data: {
          name,
          price: parseFloat(price),
          imageUrl,
        },
      });

      console.log('Game Added Successfully:', newGame); // Log ผลลัพธ์
      res.status(200).json(newGame);
    } catch (error) {
      console.error('Error Adding Game:', error); // Log ข้อผิดพลาด
      res.status(500).json({ error: 'Failed to add game.' });
    }
  } else {
    console.error('Method Not Allowed');
    res.status(405).json({ error: 'Method not allowed.' });
  }
}
