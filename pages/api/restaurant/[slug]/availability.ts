import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { findAvilabilities } from '@/services/restaurant/findAvailabilities';

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

  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      tables: true,
      open_time: true,
      close_time: true,
    },
  });

  if (!restaurant) {
    return res.status(404).json({ errorMessage: 'Restaurant not found' });
  }

  const searchTimesWithTables = await findAvilabilities({
    res,
    day,
    time,
    restaurant,
  });

  if (!searchTimesWithTables) {
    return res.status(404).json({ errorMessage: 'Restaurant not found' });
  }

  const availability = searchTimesWithTables
    .map((t) => {
      const sumSeat = t.tables.reduce((sum, table) => {
        return sum + table.seats;
      }, 0);

      return {
        time: t.time,
        available: sumSeat >= parseInt(partySize),
      };
    })
    .filter((time) => {
      const timeAfterOpenHour =
        new Date(`${day}T${time.time}`) >= new Date(`${day}T${restaurant.open_time}`);
      const timeBeforeCloseHour =
        new Date(`${day}T${time.time}`) <= new Date(`${day}T${restaurant.close_time}`);

      return timeAfterOpenHour && timeBeforeCloseHour;
    });

  return res.json(availability);
};

export default handler;
