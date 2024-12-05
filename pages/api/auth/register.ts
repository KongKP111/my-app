import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import prisma from "../../../utils/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, username, password, name } = req.body;

    // Check for required fields
    if (!email || !username || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    try {
      // Check if the email already exists
      const existingUser = await prisma.user.findUnique({ where: { email } });

      if (existingUser) {
        return res.status(400).json({ message: "Email already in use." });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the new user
      await prisma.user.create({
        data: {
          email,
          username, // ใช้ username แทน name
          password: hashedPassword,
          role: "user",
        },
      });
      

      return res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
      console.error("Error during registration:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  }

  return res.status(405).json({ message: "Method not allowed." });
}
