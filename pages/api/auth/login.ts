import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import prisma from "../../../utils/db";

async function ensureAdminUser() {
  const adminEmail = "Admin1234@gmail.com";
  const adminPassword = "123456789";

  // Check if admin already exists
  const adminUser = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!adminUser) {
    // Create hashed password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Add predefined admin user
    await prisma.user.create({
      data: {
        email: adminEmail,
        username: "Admin",
        password: hashedPassword,
        role: "admin",
      },
    });
    console.log("Predefined admin user created.");
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid credentials." });
      }

      res.status(200).json({
        username: user.username,
        email: user.email,
        role: user.role,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}

