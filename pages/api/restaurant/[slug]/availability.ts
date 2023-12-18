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

  const bookingTablesObj: { [key: string]: { [key: number]: true } } = {};

  bookings.forEach((booking) => {
    bookingTablesObj[booking.booking_time.toISOString()] = booking.tables.reduce((obj, table) => {
      return {
        ...obj,
        [table.table_id]: true,
      };
    }, {});
  });

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

  const tables = restaurant.tables;

  const searchTimesWithTables = searchTime.map((searchTime) => {
    return {
      date: new Date(`${day}T${searchTime}`),
      time: searchTime,
      tables,
    };
  });

  searchTimesWithTables.forEach((t) => {
    t.tables = t.tables.filter((table) => {
      if (bookingTablesObj[t.date.toISOString()]) {
        return !bookingTablesObj[t.date.toISOString()][table.id];
      }
      return true;
    });
  });

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
