import { NextApiRequest, NextApiResponse } from 'next';
import { times } from '../../../../data';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug, day, time, partySize } = req.query as {
    slug: string;
    day: string;
    time: string;
    partySize: string;
  };

  if (!day || !time || !partySize) {
    return res.status(400).json({ errorMessage: 'Invalid data provided' });
  }

  const searchTime = times.find((t) => t.time === time)?.searchTimes;

  if (!searchTime) {
    return res.status(400).json({ errorMessage: 'Invalid data provided' });
  }

  const bookings = await prisma.booking.findMany({
    where: {
      booking_time: {
        gte: new Date(`${day}T${searchTime[0]}`),
        lte: new Date(`${day}T${searchTime[searchTime.length - 1]}`),
      },
    },
    select: {
      number_of_people: true,
      booking_time: true,
      tables: true,
    },
  });

  return res.json({ searchTime, bookings });
};

export default handler;
