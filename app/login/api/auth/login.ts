import bcrypt from 'bcrypt';
import prisma from '../db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest,
    res: NextApiResponse) {
  const { email, password } = req.body;


  try {
    // Fetch user by email

    const ss = 'SELECT * FROM miembarazoapi.user';
    console.log(ss);

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare the provided password with the stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Password is valid; proceed with login
    res.status(200).json({ success: true, role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}
