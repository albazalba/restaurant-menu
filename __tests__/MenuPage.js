import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MenuPage from '../src/components/MenuPage';

// Mock the localStorage
const localStorageMock = (function() {
  let store = {};
  return {
    getItem: function(key) {
      return store[key] || null;
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock data
const mockMenuData = {
  categories: [
    { id: '1', name: 'Category 1' },
    { id: '2', name: 'Category 2' },
  ],
  items: [
    { id: '1', name: 'Item 1', category_id: '1', price: 10, stock: { availability: 5 } },
    { id: '2', name: 'Item 2', category_id: '2', price: 15, stock: { availability: 3 } },
    { id: '3', name: 'Item 3', category_id: '1', price: 20, stock: { availability: 0 } },
  ],
};

// Mock console.log
console.log = jest.fn();

describe('MenuPage', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('renders MenuPage component', () => {
    render(<MenuPage menuData={mockMenuData} />);
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search for dishes...')).toBeInTheDocument();
    expect(screen.getByText('Category 1')).toBeInTheDocument();
    expect(screen.getByText('Category 2')).toBeInTheDocument();
  });

  test('filters items based on search input', () => {
    render(<MenuPage menuData={mockMenuData} />);
    const searchInput = screen.getByPlaceholderText('Search for dishes...');

    fireEvent.change(searchInput, { target: { value: 'Item 1' } });

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.queryByText('Item 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Item 3')).not.toBeInTheDocument();
  });

  test('shows "No data to show" when no items match the search', () => {
    render(<MenuPage menuData={mockMenuData} />);
    const searchInput = screen.getByPlaceholderText('Search for dishes...');

    fireEvent.change(searchInput, { target: { value: 'Non-existent Item' } });

    expect(screen.getByText('No data to show')).toBeInTheDocument();
  });

  test('adds item to basket', async () => {
    render(<MenuPage menuData={mockMenuData} />);

    const addButtons = screen.getAllByText('+ Add');
    fireEvent.click(addButtons[0]);

    await waitFor(() => {
      expect(JSON.parse(localStorage.getItem('basket'))).toEqual({ '1': 1 });
    });
  });

  test('removes item from basket', async () => {
    localStorage.setItem('basket', JSON.stringify({ '1': 2 }));

    render(<MenuPage menuData={mockMenuData} />);

    const removeButtons = screen.getAllByText('-');
    fireEvent.click(removeButtons[0]);

    await waitFor(() => {
      expect(JSON.parse(localStorage.getItem('basket'))).toEqual({ '1': 1 });
    });

    fireEvent.click(removeButtons[0]);

    await waitFor(() => {
      expect(JSON.parse(localStorage.getItem('basket'))).toEqual({});
    });
  });


  test('opens drawer when cart icon is clicked', () => {
    render(<MenuPage menuData={mockMenuData} />);

    const cartButton = screen.getByTestId('cart');
    fireEvent.click(cartButton);

    expect(screen.getByText('Cart Items')).toBeInTheDocument();
  });

  test('displays correct number of items in cart', async () => {
    localStorage.setItem('basket', JSON.stringify({ '1': 2, '2': 1 }));

    render(<MenuPage menuData={mockMenuData} />);

    const cartCount = screen.getByText('3');
    expect(cartCount).toBeInTheDocument();
  });

  test('resets filter and basket when back arrow is clicked', () => {
    localStorage.setItem('basket', JSON.stringify({ '1': 1 }));

    render(<MenuPage menuData={mockMenuData} />);

    const searchInput = screen.getByPlaceholderText('Search for dishes...');
    fireEvent.change(searchInput, { target: { value: 'Item 1' } });

    const backButton = screen.getByTestId('reset');
    fireEvent.click(backButton);

    expect(JSON.parse(localStorage.getItem('basket'))).toEqual({});
    expect(searchInput).toHaveValue('');
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  test('loads basket from localStorage on mount', () => {
    localStorage.setItem('basket', JSON.stringify({ '1': 2, '2': 1 }));

    render(<MenuPage menuData={mockMenuData} />);

    const cartCount = screen.getByText('3');
    expect(cartCount).toBeInTheDocument();
  });

  test('updates localStorage when basket changes', async () => {
    render(<MenuPage menuData={mockMenuData} />);

    const addButtons = screen.getAllByText('+ Add');
    fireEvent.click(addButtons[0]);

    await waitFor(() => {
      expect(JSON.parse(localStorage.getItem('basket'))).toEqual({ '1': 1 });
    });
  });
});
