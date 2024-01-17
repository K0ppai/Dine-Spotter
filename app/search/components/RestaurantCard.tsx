import Link from 'next/link';
import React from 'react';
import { Cuisine, Location, PRICE, Review } from '@prisma/client';
import Price from '@/app/components/Price';
import { calculateAverageRating } from '@/utils/calculateAverageRating';
import Stars from '@/app/components/Stars';
interface RestaurantType {
  id: number;
  slug: string;
  name: string;
  main_image: string;
  price: PRICE;
  cuisine: Cuisine;
  location: Location;
  reviews: Review[];
}

const RestaurantCard = ({ restaurant }: { restaurant: RestaurantType }) => {
  const calculatedRating = calculateAverageRating(restaurant.reviews);

  const renderRating = () => {
    if (calculatedRating > 4) return 'Awesome';
    else if (calculatedRating <= 4 && calculatedRating > 3) return 'Good';
    else if (calculatedRating <= 3 && calculatedRating > 2) return 'Average';
    else return '';
  };

  return (
    <div className="border-b flex pb-5">
      <img src={restaurant.main_image} alt={restaurant.name} className="w-44 rounded" />
      <div className="pl-5">
        <h2 className="text-3xl">{restaurant.name}</h2>
        <div className="flex items-start">
          <div className="flex mb-2">
            <Stars reviews={restaurant.reviews} />
          </div>
          <p className="ml-2 text-sm">{renderRating()}</p>
        </div>
        <div className="mb-9">
          <div className="font-light flex text-reg">
            <Price price={restaurant.price} />
            <p className="mr-4 capitalize">{restaurant.location.name}</p>
            <p className="mr-4 capitalize">{restaurant.cuisine.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/restaurant/${restaurant.slug}`}>View more information</Link>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
