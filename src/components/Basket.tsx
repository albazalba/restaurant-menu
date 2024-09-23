import { MenuItem } from "@/types/types";
import Image from "next/image";

interface BasketProps {
  items: MenuItem[];
  basket: { [key: string]: number };
}

export default function Basket({ items, basket }: BasketProps) {
  const basketItems = items.filter((item) => basket[item.id]);
  const formatPrice = (price: number) => (price / 100).toFixed(2);

  const total = basketItems.reduce((sum, item) => {
    const price = item.price * (1 - item.discount_rate);
    return sum + price * basket[item.id];
  }, 0);

  return (
    <div className="w-full pl-0 md:pl-4 ">
      <h2 className="text-xl font-semibold mb-4">Basket</h2>
      {basketItems.length <=0 && <p className="text-fontLight">Your cart is empty.</p>}
      {basketItems.map((item) => (
        <div key={item.id} className="flex items-center mb-4 pb-4 border-b">
          {item.photo && (
            <Image
              src={item.photo}
              alt={item.name}
              width={60}
              height={60}
              className="rounded-md mr-4"
            />
          )}

          <div className="flex-grow">
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-sm text-gray-500">
              {basket[item.id]} x $
              {formatPrice(item.price * (1 - item.discount_rate))}
            </p>
          </div>
          <div className="text-right">
            <p className="font-semibold">
              $
              {formatPrice(
                item.price * (1 - item.discount_rate) * basket[item.id]
              )}
            </p>
            {item.discount_rate > 0 && (
              <p className="text-sm text-gray-500 line-through">
                ${formatPrice(item.price * basket[item.id])}
              </p>
            )}
          </div>
        </div>
      ))}
      <div className="flex items-end justify-end mt-8 font-bold">Total: ${formatPrice(total)}</div>
    </div>
  );
}
