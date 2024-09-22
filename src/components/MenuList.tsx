import { MenuItem } from "@/types/types";
import Image from "next/image";

interface MenuListProps {
  items: MenuItem[];
  onAddToBasket: (item: MenuItem) => void;
  onRemoveFromBasket: (item: MenuItem) => void;
  basket: { [key: string]: number };
  categoryName: string;
}

export default function MenuList({
  items,
  onAddToBasket,
  onRemoveFromBasket,
  basket,
  categoryName,
}: MenuListProps) {
  const formatPrice = (price: number) => (price / 100).toFixed(2);
  const getItemCount = (item: MenuItem) => basket[item.id] || 0;

  if (items.length <= 0) {
    return ""
  }

  return (
    <div className="w-full  pr-0 md:pr-4 mb-4 md:mb-0">
      <h2 className="text-2xl font-bold mb-4 px-2 py-4">{categoryName}</h2>
      {items.map((item) => {
        const itemCount = getItemCount(item);
        const availableStock = item.stock?.availability || 0;
        const isInBasket = itemCount > 0;

        return (
          <div
            key={item.id}
            className={`border-b border-[#F4F6F9] px-2 py-4 flex items-center justify-between
              transition-all duration-300 ease-in-out
              ${
                isInBasket
                  ? "border-l-4 border-l-[#1258FF] pl-3"
                  : "border-l-4 border-l-transparent pl-2"
              }`}
          >
            <div className="flex-grow">
              <h2 className="text-xl font-semibold text-fontPrimary">
                {item.name}
              </h2>
              <p className="text-sm text-fontLight ellipsis-2-lines">
                {item.description}
              </p>
              <p className="mt-2 text-fontPrimary">
                <>
                  <span className=" font-bold ">
                    AED {formatPrice(item.price * (1 - item.discount_rate))}
                  </span>
                  {item.discount_rate > 0 && (
                    <span className="ml-2 text-fontLight line-through text-sm">
                      AED {formatPrice(item.price)}
                    </span>
                  )}
                </>
              </p>
            </div>
            <div className="w-32 h-24 object-cover relative shrink-0 flex justify-center items-center">
              {item.photo && (
                <Image
                  src={item.photo}
                  alt={item.name}
                  layout="fill"
                  objectFit="contain"
                  className="rounded"
                />
              )}
              {!item.stock || item?.stock?.availability <= 0 ? (
                <div className=" absolute bottom-10 z-10 text-white text-xs translate-y-full border p-1 bg-[#ea292975] font-semibold backdrop-filter rounded">
                  Out of stock.
                </div>
              ) : (
                <div
                  className={`${item.photo && "ml-4"} flex items-center ${
                    item.photo && "absolute"
                  } bottom-[-10px] left-[10%] bg-white overflow-hidden rounded`}
                >
                  {itemCount > 0 ? (
                    <div className="text-[#1258FF] font-semibold border border-[#1258FF] shadow-sm shadow-black rounded flex items-center px-1 py-1">
                      <button
                        onClick={() => onRemoveFromBasket(item)}
                        className="text-[#1258FF] text-xs px-2"
                      >
                        -
                      </button>
                      <span className="mx-2 text-xs">{itemCount}</span>
                      {itemCount >= availableStock ? (
                        ""
                      ) : (
                        <button
                          onClick={() => onAddToBasket(item)}
                          className="text-[#1258FF] text-xs px-2"
                        >
                          +
                        </button>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => onAddToBasket(item)}
                      className="text-[#1258FF] font-semibold px-4 py-1 border border-[#1258FF] rounded text-xs"
                    >
                      + Add
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
