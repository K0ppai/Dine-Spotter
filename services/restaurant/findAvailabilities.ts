import { times } from '@/data';
import { PrismaClient, Table } from '@prisma/client';
import { NextApiResponse } from 'next';

const prisma = new PrismaClient();

export const findAvilabilities = async ({
  res,
  day,
  time,
  restaurant,
}: {
  res: NextApiResponse;
  day: string;
  time: string;
  restaurant: {
    tables: Table[];
    open_time: string;
    close_time: string;
  };
}) => {
  const searchTimes = times.find((t) => t.time === time)?.searchTimes;

  if (!searchTimes) {
    return res.status(400).json({ errorMessage: 'Invalid data provided' });
  }

  const bookings = await prisma.booking.findMany({
    where: {
      booking_time: {
        gte: new Date(`${day}T${searchTimes[0]}`),
        lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`),
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

  const tables = restaurant.tables;

  const searchTimesWithTables = searchTimes.map((searchTime) => {
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

  return searchTimesWithTables;
};
