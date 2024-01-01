import React from 'react';
import MenuCard from './MenuCard';
import { Item } from '@prisma/client';

const Menu = ({ items }: { items: Item[] }) => {
  return (
    <main className="bg-white mt-5">
      <div>
        <div className="mt-4 pb-1 mb-1">
          <h1 className="font-bold text-4xl">Menu</h1>
        </div>
        <div className="flex flex-wrap justify-between">
          {items.length === 0 ? (
            <p>There is no menu yet in this restaurant.</p>
          ) : (
            items.map((item) => {
              return <MenuCard key={item.id} item={item} />;
            })
          )}
        </div>
      </div>
    </main>
  );
};

export default Menu;
