import { NextApiRequest, NextApiResponse } from 'next';
import validator from 'validator';
import bcrypt from 'bcrypt';
import * as jose from 'jose';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { firstName, lastName, email, password, phone, city } = req.body;
  const errors: string[] = [];

  const validateSchema = [
    {
      valid: validator.isLength(firstName, { min: 2, max: 20 }),
      errorMessage: 'First name must be between 2 and 20 characters',
    },
    {
      valid: validator.isLength(lastName, { min: 2, max: 20 }),
      errorMessage: 'Last name must be between 2 and 20 characters',
    },
    {
      valid: validator.isEmail(email),
      errorMessage: 'Email is invalid',
    },
    {
      valid: validator.isLength(password, { min: 6, max: 20 }),
      errorMessage: 'Password must be between 6 and 20 characters',
    },
    {
      valid: validator.isMobilePhone(phone),
      errorMessage: 'Phone number is invalid',
    },
    {
      valid: validator.isLength(city, { min: 1 }),
      errorMessage: 'City must exist',
    },
  ];

  if (req.method === 'POST') {
    validateSchema.forEach((item) => {
      if (!item.valid) {
        errors.push(item.errorMessage);
      }
    });

    if (errors.length) {
      return res.status(400).json({ errorMessages: errors });
    }

    const userWithEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithEmail) {
      return res.status(400).json({ errorMessages: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        email,
        password: hashedPassword,
        phone,
        city,
      },
    });

    const alg = 'HS256';
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new jose.SignJWT({email: user.email}).setProtectedHeader({alg}).setExpirationTime('24h').sign(secret);

    res.status(200).json(token);
  }
};

export default handler;
