// app/components/MenuPage.tsx
"use client";

import { useState, useEffect } from "react";
import { MenuData, MenuItem } from "@/types/types";
import MenuList from "./MenuList";
import Basket from "./Basket";
import BackArrow from "@/app/icons/BackArrow";
import SearchIcon from "@/app/icons/SearchIcon";
import Drawer from "./Drawer";
import { ShoppingCart } from "lucide-react";

interface MenuPageProps {
  menuData: MenuData;
}

export default function MenuPage({ menuData }: MenuPageProps) {
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>(
    menuData.items
  );
  const [basket, setBasket] = useState<{ [key: string]: number }>({});
  const [filter, setFilter] = useState("");
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    const storedBasket = localStorage.getItem("basket");
    if (storedBasket) {
      setBasket(JSON.parse(storedBasket));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilter(value);
    setFilteredItems(
      menuData.items.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleAddToBasket = (item: MenuItem) => {
    const currentQuantity = basket[item.id] || 0;
    const availableStock = item.stock?.availability || 0;

    if (currentQuantity < availableStock) {
      setBasket((prev) => {
        const newBasket = {
          ...prev,
          [item.id]: currentQuantity + 1,
        };
        return newBasket;
      });
    } else {
      console.log("Cannot add more. Stock limit reached.");
    }
  };
  const handleRemoveFromBasket = (item: MenuItem) => {
    setBasket((prev) => {
      const newBasket = { ...prev };
      if (newBasket[item.id] > 1) {
        newBasket[item.id]--;
      } else {
        delete newBasket[item.id];
      }
      return newBasket;
    });
  };

  const handleReset = () => {
    setBasket({});
    setFilter("");
    setFilteredItems(menuData.items);
  };

  return (
    <div className="container mx-auto">
      <div className="sticky top-0 bg-white z-20">
        <header className="py-4 px-4">
          <div className="flex justify-between">
            <button onClick={handleReset} className="" data-testid="reset">
              <BackArrow />
            </button>
            <button onClick={() => setDrawerOpen(true)} className="relative"  data-testid="cart">
              <ShoppingCart />
              {Object.keys(basket).length > 0 && (
                <span className="absolute top-[-5px] right-[-5px] bg-red-500 text-white text-xs rounded-full p-2 h-3 w-3 flex items-center justify-center">
                  {Object.values(basket).reduce((a, b) => a + b, 0)}
                </span>
              )}
            </button>
          </div>

          <h1 className="text-2xl font-bold mt-4">Search</h1>
        </header>
        <div className="relative px-4 pb-4">
          <SearchIcon className="absolute top-4 left-8 " />
          <input
            type="text"
            placeholder="Search for dishes..."
            value={filter}
            onChange={handleFilter}
            className="w-full pl-11 p-3 placeholder:text-sm border border-[#EBEFF4] rounded mb-4 focus:outline-none"
          />
        </div>
      </div>
      <div className="flex flex-col">
        {filteredItems.length > 0 ? (
          menuData.categories.map((category) => {
            const categoryItems = filteredItems.filter(
              (item) => item.category_id === category.id
            );
            return (
              <MenuList
                key={category.id}
                items={categoryItems}
                onAddToBasket={handleAddToBasket}
                onRemoveFromBasket={handleRemoveFromBasket}
                basket={basket}
                categoryName={category.name}
              />
            );
          })
        ) : (
          <p className="flex items-center justify-center text-fontLight text-sm opacity-8">
            No data to show
          </p>
        )}
        {}
      </div>
      <Drawer open={drawerOpen} setOpen={setDrawerOpen} title="Cart Items">
        <Basket items={menuData.items} basket={basket} />
      </Drawer>
    </div>
  );
}
