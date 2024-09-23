import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MenuList from "../src/components/MenuList";
import "@testing-library/jest-dom";

const mockItems = [
  {
    id: "10",
    name: "Fresh Banana",
    url: "fresh-banana",
    price: 1000,
    discount_rate: 0,
    stock: {
      availability: 2,
    },
    description: "1 kg",
    photo: null,
    category_id: "3",
  },
  {
    id: "11",
    name: "Italian Salad",
    url: "italian-salad",
    price: 3400,
    discount_rate: 0,
    stock: {
      availability: 1,
    },
    description:
      "Grilled chicken, avocado, mix lettuce, sliced almonds, tomatoes and olives",
    photo:
      "https://chatfood-cdn.s3.eu-central-1.amazonaws.com/fe-code-challenge-1/italian-salad.jpg",
    category_id: "4",
  },
  {
    id: "12",
    name: "Mint Mojito",
    url: "mint-mojito",
    price: 1200,
    discount_rate: 0.8,
    stock: {
      availability: 0,
    },
    description: "",
    photo: null,
    category_id: "5",
  },
];

const mockOnAddToBasket = jest.fn();
const mockOnRemoveFromBasket = jest.fn();

describe("MenuList", () => {
  test("renders without crashing", () => {
    render(
      <MenuList
        items={mockItems}
        onAddToBasket={mockOnAddToBasket}
        onRemoveFromBasket={mockOnRemoveFromBasket}
        basket={{}}
        categoryName="Test Category"
      />
    );
    expect(screen.getByText("Test Category")).toBeInTheDocument();
  });

  test("adds item to basket", () => {
    render(
      <MenuList
        items={mockItems}
        onAddToBasket={mockOnAddToBasket}
        onRemoveFromBasket={mockOnRemoveFromBasket}
        basket={{}}
        categoryName="Test Category"
      />
    );

    const addButton = screen.getAllByText("+ Add")[0];
    fireEvent.click(addButton);
    expect(mockOnAddToBasket).toHaveBeenCalledWith(mockItems[0]);
  });

  test("removes item from basket", () => {
    render(
      <MenuList
        items={mockItems}
        onAddToBasket={mockOnAddToBasket}
        onRemoveFromBasket={mockOnRemoveFromBasket}
        basket={{ 10: 1 }}
        categoryName="Test Category"
      />
    );

    const removeButton = screen.getByText("-");
    fireEvent.click(removeButton);
    expect(mockOnRemoveFromBasket).toHaveBeenCalledWith(mockItems[0]);
  });
  test("add item to the basket", () => {
    render(
      <MenuList
        items={mockItems}
        onAddToBasket={mockOnAddToBasket}
        onRemoveFromBasket={mockOnRemoveFromBasket}
        basket={{ 10: 1 }}
        categoryName="Test Category"
      />
    );

    const removeButton = screen.getByText("+");
    fireEvent.click(removeButton);
    expect(mockOnAddToBasket).toHaveBeenCalledWith(mockItems[0]);
  });

  test("displays out of stock message", () => {
    render(
      <MenuList
        items={mockItems}
        onAddToBasket={mockOnAddToBasket}
        onRemoveFromBasket={mockOnRemoveFromBasket}
        basket={{ 11: 1 }}
        categoryName="Test Category"
      />
    );
    expect(screen.getByText("Out of stock.")).toBeInTheDocument();
  });
  test("Hide + if reached limit of number of stocks", () => {
    const mockAvailability = [
      {
        id: "11",
        name: "Italian Salad",
        url: "italian-salad",
        price: 3400,
        discount_rate: 0,
        stock: {
          availability: 1,
        },
        description:
          "Grilled chicken, avocado, mix lettuce, sliced almonds, tomatoes and olives",
        photo:
          "https://chatfood-cdn.s3.eu-central-1.amazonaws.com/fe-code-challenge-1/italian-salad.jpg",
        category_id: "4",
      },
    ];
    render(
      <MenuList
        items={mockAvailability}
        onAddToBasket={mockOnAddToBasket}
        onRemoveFromBasket={mockOnRemoveFromBasket}
        basket={{ 11: 1 }}
        categoryName="Test Category"
      />)
      const addButton = screen.queryByText("+");
    expect(addButton).not.toBeInTheDocument();

  });
});
