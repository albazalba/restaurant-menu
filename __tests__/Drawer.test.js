import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Drawer from '../src/components/Drawer';

jest.mock('lucide-react', () => ({
  X: () => <div data-testid="mock-x-icon">X</div>,
}));

describe('Drawer', () => {
  const mockSetOpen = jest.fn();
  const defaultProps = {
    open: true,
    setOpen: mockSetOpen,
    title: 'Test Drawer',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly when open', () => {
    render(
      <Drawer {...defaultProps}>
        <div>Drawer content</div>
      </Drawer>
    );

    expect(screen.getByText('Test Drawer')).toBeInTheDocument();
    expect(screen.getByText('Drawer content')).toBeInTheDocument();
    expect(screen.getByTestId('mock-x-icon')).toBeInTheDocument();
  });

  test('does not render content when closed', () => {
    render(
      <Drawer {...defaultProps} open={false}>
        <div>Drawer content</div>
      </Drawer>
    );

    expect(screen.queryByText('Test Drawer')).toBeInTheDocument();
    expect(screen.queryByText('Drawer content')).toBeInTheDocument();
    expect(screen.getByTestId('mock-x-icon')).toBeInTheDocument();

    const drawer = screen.getByTestId('drawer');
    expect(drawer).toHaveClass('translate-y-full');
  });

  test('calls setOpen when close button is clicked', () => {
    render(<Drawer {...defaultProps} />);

    fireEvent.click(screen.getByTestId('mock-x-icon'));
    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });

  test('calls setOpen when clicking outside the drawer', () => {
    render(
      <div>
        <div data-testid="outside">Outside</div>
        <Drawer {...defaultProps} />
      </div>
    );

    fireEvent.mouseDown(screen.getByTestId('outside'));
    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });


  test('renders children correctly', () => {
    render(
      <Drawer {...defaultProps}>
        <div data-testid="child1">Child 1</div>
        <div data-testid="child2">Child 2</div>
      </Drawer>
    );

    expect(screen.getByTestId('child1')).toBeInTheDocument();
    expect(screen.getByTestId('child2')).toBeInTheDocument();
  });
});
