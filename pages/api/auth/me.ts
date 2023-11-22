import { NextApiRequest, NextApiResponse } from 'next';
import * as jose from 'jose';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const bearerToken = req.headers.authorization as string;

  if (!bearerToken) {
    return res.status(401).json({ message: 'Unauthorized request' });
  }

  const token = bearerToken.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized request' });
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  try {
    await jose.jwtVerify(token, secret);
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized request' });
  }

  const payload = jwt.decode(token) as { email: string };

  if (!payload.email) {
    return res.status(401).json({ message: 'Unauthorized request' });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
      city: true,
    },
  });

  return res.status(200).json({ user });
};

export default handler;
