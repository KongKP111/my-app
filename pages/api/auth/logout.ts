import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // Clear the cookie by setting its expiration date to the past
    res.setHeader('Set-Cookie', cookie.serialize('token', '', {
      httpOnly: true, // Ensures the cookie is sent only to the server
      secure: process.env.NODE_ENV === 'production', // Secure flag for HTTPS
      sameSite: 'strict', // Helps prevent CSRF
      maxAge: -1, // Expires the cookie immediately
      path: '/' // Cookie applies to the entire domain
    }));

    res.status(200).json({ message: "Logged out successfully" });
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
