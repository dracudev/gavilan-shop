import { render, screen, fireEvent } from "@testing-library/react";
import { QtySelector } from "./qty-selector";
import { useCartStore } from "@/store/cart/cart-store";
import "@testing-library/jest-dom";

// Mock the Zustand store
jest.mock("@/store/cart/cart-store");

describe("QtySelector", () => {
  const updateItemQuantity = jest.fn();

  beforeEach(() => {
    (useCartStore as unknown as jest.Mock).mockReturnValue({
      items: [{ id: "1", quantity: 2 }],
      updateItemQuantity,
    });
  });

  it("renders with initial quantity", () => {
    render(<QtySelector id="1" />);

    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("increments quantity when + button is clicked", () => {
    render(<QtySelector id="1" />);

    const incrementButton = screen.getByRole("add-qty");
    fireEvent.click(incrementButton);

    expect(updateItemQuantity).toHaveBeenCalledWith("1", 3);
  });

  it("decrements quantity when - button is clicked", () => {
    render(<QtySelector id="1" />);

    const decrementButton = screen.getByRole("remove-qty");
    fireEvent.click(decrementButton);

    expect(updateItemQuantity).toHaveBeenCalledWith("1", 1);
  });

  it("does not decrement below 1", () => {
    (useCartStore as unknown as jest.Mock).mockReturnValueOnce({
      items: [{ id: "1", quantity: 1 }],
      updateItemQuantity,
    });

    render(<QtySelector id="1" />);

    const decrementButton = screen.getByRole("remove-qty");
    fireEvent.click(decrementButton);

    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("calls onQuantityChange prop when quantity changes", () => {
    const mockOnQuantityChange = jest.fn();
    render(<QtySelector id="1" onQuantityChange={mockOnQuantityChange} />);

    const incrementButton = screen.getByRole("add-qty");
    fireEvent.click(incrementButton);

    expect(mockOnQuantityChange).toHaveBeenCalledWith(3);
  });
});
