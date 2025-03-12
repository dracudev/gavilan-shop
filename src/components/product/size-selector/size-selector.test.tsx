import { render, screen, fireEvent } from "@testing-library/react";
import { SizeSelector } from "./size-selector";
import "@testing-library/jest-dom";
import type { Size } from "@/interfaces";

describe("SizeSelector", () => {
  const mockOnSizeChange = jest.fn();
  const availableSizes: Size[] = ["S", "M", "L"];
  const selectedSize: Size = "M";

  beforeEach(() => {
    mockOnSizeChange.mockClear();
  });

  it("renders with available sizes", () => {
    render(
      <SizeSelector
        availableSizes={availableSizes}
        selectedSize={selectedSize}
        onSizeChange={mockOnSizeChange}
      />
    );

    availableSizes.forEach((size) => {
      expect(screen.getByText(size)).toBeInTheDocument();
    });
  });

  it("highlights the selected size", () => {
    render(
      <SizeSelector
        availableSizes={availableSizes}
        selectedSize={selectedSize}
        onSizeChange={mockOnSizeChange}
      />
    );

    const selectedButton = screen.getByText(selectedSize);
    expect(selectedButton).toHaveClass("underline");
  });

  it("calls onSizeChange when a size is clicked", () => {
    render(
      <SizeSelector
        availableSizes={availableSizes}
        selectedSize={selectedSize}
        onSizeChange={mockOnSizeChange}
      />
    );

    const newSize: Size = "L";
    const newSizeButton = screen.getByText(newSize);
    fireEvent.click(newSizeButton);

    expect(mockOnSizeChange).toHaveBeenCalledWith(newSize);
  });

  it("does not call onSizeChange when the selected size is clicked again", () => {
    render(
      <SizeSelector
        availableSizes={availableSizes}
        selectedSize={selectedSize}
        onSizeChange={mockOnSizeChange}
      />
    );

    const selectedButton = screen.getByText(selectedSize);
    fireEvent.click(selectedButton);

    expect(mockOnSizeChange).not.toHaveBeenCalled();
  });
});
