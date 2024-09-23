import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Basket from "../src/components/Basket";

// Mock Next.js Image component to avoid error
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props) => {
    return <img {...props} />;
  },
}));

describe("Basket Component", () => {
  const mockItems = [
    {
      id: "1",
      name: "Item 1",
      price: 1000,
      discount_rate: 0,
      photo: "/item1.jpg",
    },
    {
      id: "2",
      name: "Item 2",
      price: 2000,
      discount_rate: 0.1,
      photo: "/item2.jpg",
    },
    { id: "3", name: "Item 3", price: 3000, discount_rate: 0, photo: null },
  ];

  const mockBasket = { "1": 2, "2": 1 };

  it("renders the basket title", () => {
    render(<Basket items={mockItems} basket={mockBasket} />);
    expect(screen.getByText("Basket")).toBeInTheDocument();
  });

  it("displays correct items from the basket", () => {
    render(<Basket items={mockItems} basket={mockBasket} />);
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.queryByText("Item 3")).not.toBeInTheDocument();
  });

  it("shows correct quantities for each item", () => {
    render(<Basket items={mockItems} basket={mockBasket} />);
    expect(screen.getByText("2 x $10.00")).toBeInTheDocument();
    expect(screen.getByText("1 x $18.00")).toBeInTheDocument();
  });

  it("calculates and displays correct total price", () => {
    render(<Basket items={mockItems} basket={mockBasket} />);
    expect(screen.getByText("Total: $38.00")).toBeInTheDocument();
  });

  it("shows discounted prices correctly", () => {
    render(<Basket items={mockItems} basket={mockBasket} />);
    expect(screen.getByText("$18.00")).toBeInTheDocument();
    const discountedPrices = screen.getAllByText("$20.00");
    expect(discountedPrices[1]).toHaveClass("line-through");
  });

  it("displays placeholder image when photo is null", () => {
    const mockBasketWithNullPhoto = { "3": 1 };
    render(<Basket items={mockItems} basket={mockBasketWithNullPhoto} />);
    expect(screen.getByText("Item 3")).toBeInTheDocument();

  });

  it('shows "Your cart is empty" message when basket is empty', () => {
    render(<Basket items={mockItems} basket={{}} />);
    expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
  });

  it("formats prices correctly", () => {
    const mockItemsWithCents = [
      {
        id: "4",
        name: "Item 4",
        price: 1099,
        discount_rate: 0,
        photo: "/item4.jpg",
      },
    ];
    const mockBasketWithCents = { "4": 1 };
    render(<Basket items={mockItemsWithCents} basket={mockBasketWithCents} />);
    expect(screen.getByText("1 x $10.99")).toBeInTheDocument();
  });

  it("handles multiple items with different discounts correctly", () => {
    const complexItems = [
      {
        id: "5",
        name: "Item 5",
        price: 5000,
        discount_rate: 0.2,
        photo: "/item5.jpg",
      },
      {
        id: "6",
        name: "Item 6",
        price: 7500,
        discount_rate: 0.1,
        photo: "/item6.jpg",
      },
    ];
    const complexBasket = { "5": 2, "6": 3 };
    render(<Basket items={complexItems} basket={complexBasket} />);
    expect(screen.getByText("2 x $40.00")).toBeInTheDocument();
    expect(screen.getByText("3 x $67.50")).toBeInTheDocument();
    expect(screen.getByText("Total: $282.50")).toBeInTheDocument();
  });
});
