import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { ProductSlideshow } from "./product-slideshow";

describe("ProductSlideshow", () => {
  const images = [
    "/images/product1.jpg",
    "/images/product2.jpg",
    "/images/product3.jpg",
  ];
  const title = "Sample Product";

  it("renders the slideshow with images", () => {
    render(<ProductSlideshow images={images} title={title} />);

    const slides = screen.getAllByTestId("swiper-slide");
    expect(slides.length).toBeGreaterThan(0);

    const imgElements = screen.getAllByAltText(title);
    expect(imgElements.length).toBeGreaterThan(0);
  });

  it("applies the provided className", () => {
    const className = "custom-class";
    render(
      <ProductSlideshow images={images} title={title} className={className} />
    );

    const container = screen.getByRole("swiper1").closest(`.${className}`);
    expect(container).toHaveClass(className);
  });

  it("renders the correct number of slides", () => {
    render(<ProductSlideshow images={images} title={title} />);

    const slides = screen.getAllByTestId("swiper-slide");
    // We expect double the number of images because this component has two Swipers
    expect(slides.length).toBe(images.length * 2);
  });
});
