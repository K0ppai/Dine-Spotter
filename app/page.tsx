import { Cuisine, Location, PRICE, PrismaClient, Review } from '@prisma/client';
import Header from './components/Header';
import RestaurantCard from './components/RestaurantCard';

export const prisma = new PrismaClient();

export interface RestaurantCardType {
  id: number;
  name: string;
  main_image: string;
  cuisine: Cuisine;
  location: Location;
  price: PRICE;
  slug: string;
  reviews: Review[];
}

const fetchRestaurants = async (): Promise<RestaurantCardType[]> => {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      location: true,
      price: true,
      slug: true,
      reviews: true,
    },
  });

  return restaurants;
};

export default async function Home() {
  const restaurants = await fetchRestaurants();

  return (
    <>
      <main>
        <Header />
        <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
          {restaurants.map((restaurant, index) => (
            <RestaurantCard key={index} restaurant={restaurant} />
          ))}
        </div>
      </main>
    </>
  );
}
// iz2UieNzdAqfGEt4
