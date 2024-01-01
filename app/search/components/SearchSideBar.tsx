import { Cuisine, Location, PRICE } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import { SearchParamsType } from '../page';

const SearchSideBar = async ({
  locations,
  cuisines,
  searchParams,
}: {
  locations: Location[];
  cuisines: Cuisine[];
  searchParams: SearchParamsType;
}) => {
  const priceLinkComponents = [
    {
      label: '$',
      price: PRICE.CHEAP,
      className: 'border w-full text-[15px] font-light text-center rounded-l p-2',
    },
    {
      label: '$$',
      price: PRICE.REGULAR,
      className: 'border-r border-t border-b w-full text-center text-[15px] font-light p-2',
    },
    {
      label: '$$$',
      price: PRICE.EXPENSIVE,
      className: 'border-r border-t border-b w-full text-center text-[15px] font-light p-2 rounded-r',
    },
  ];

  return (
    <div className="w-1/5">
      <div className="border-b pb-4 flex flex-col">
        <h1 className="mb-2">Region</h1>
        {locations.map((location) => (
          <Link
            href={{
              pathname: '/search',
              query: {
                ...searchParams,
                city: location.name,
              },
            }}
            key={location.id}
            className="font-light capitalize"
          >
            {location.name}
          </Link>
        ))}
      </div>
      <div className="border-b pb-4 mt-3 flex flex-col">
        <h1 className="mb-2">Cuisine</h1>
        {cuisines.map((cuisine) => (
          <Link
            href={{
              pathname: '/search',
              query: {
                ...searchParams,
                cuisine: cuisine.name,
              },
            }}
            key={cuisine.id}
            className="font-light capitalize"
          >
            {cuisine.name}
          </Link>
        ))}
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2">Price</h1>
        <div className="flex">
          {priceLinkComponents.map(({ label, price, className }) => (
            <Link
              href={{
                pathname: '/search',
                query: {
                  ...searchParams,
                  price,
                },
              }}
              key={price}
              className={className}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchSideBar;
