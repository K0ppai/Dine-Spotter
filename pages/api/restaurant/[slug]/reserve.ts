import { findAvilabilities } from '@/services/restaurant/findAvailabilities';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

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
    return res.status(400).json({ errorMessage: 'Restaurant not found' });
  }

  if (
    new Date(`${day}T${time}`) < new Date(`${day}T${restaurant.open_time}`) ||
    new Date(`${day}T${time}`) > new Date(`${day}T${restaurant.close_time}`)
  ) {
    return res.status(400).json({ errorMessage: 'Restaurant does not open at this time' });
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

  const searchTimeWithTables = searchTimesWithTables.find((t) => {
    return t.date.toISOString() === new Date(`${day}T${time}`).toISOString();
  });

  const tableCounts: {
    2: number[];
    4: number[];
  } = {
    2: [],
    4: [],
  };

  searchTimeWithTables?.tables.forEach((table) => {
    if (table.seats === 2) {
      tableCounts[2].push(table.id);
    } else {
      tableCounts[4].push(table.id);
    }
  });

  const tablesToBook: number[] = []

  let seatsRemaining = parseInt(partySize);

  while (seatsRemaining > 0) {
    if (seatsRemaining >= 3) {
      if (tableCounts[4].length) {
        tablesToBook.push(tableCounts[4][0]);
        tableCounts[4].shift();
        seatsRemaining -= 4;
      } else {
        if (tableCounts[2].length) {
          tablesToBook.push(tableCounts[2][0]);
          tableCounts[2].shift();
          seatsRemaining -= 2;
        }
      }
    } else {
      if(tableCounts[2].length) {
        tablesToBook.push(tableCounts[2][0]);
        tableCounts[2].shift();
        seatsRemaining -= 2;
      } else {
        if (tableCounts[4].length) {
          tablesToBook.push(tableCounts[4][0]);
          tableCounts[4].shift();
          seatsRemaining -= 4;
        }
      }
    }
  }

  return res.json({ tableCounts, tablesToBook });
};

export default handler;
