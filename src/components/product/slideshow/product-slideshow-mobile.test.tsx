import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { ProductSlideshowMobile } from "@/components/product/slideshow/product-slideshow-mobile";

describe("ProductSlideshowMobile", () => {
  const images = [
    "/images/product1.jpg",
    "/images/product2.jpg",
    "/images/product3.jpg",
  ];
  const title = "Sample Product";

  afterEach(() => {
    cleanup();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("renders the slideshow with images", () => {
    render(<ProductSlideshowMobile images={images} title={title} />);

    const slides = screen.getAllByTestId("swiper-slide");
    expect(slides).toHaveLength(images.length);

    const imgElements = screen.getAllByAltText(title);
    expect(imgElements).toHaveLength(images.length);

    imgElements.forEach((img, index) => {
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src");
      expect(img.getAttribute("src")).toContain(
        encodeURIComponent(images[index])
      );
    });
  });

  it("applies the provided className", () => {
    const className = "custom-class";
    render(
      <ProductSlideshowMobile
        images={images}
        title={title}
        className={className}
      />
    );

    const container = screen.getByTestId("swiper").parentElement;
    expect(container).toHaveClass(className);
  });

  it("renders the correct number of slides", () => {
    render(<ProductSlideshowMobile images={images} title={title} />);

    const slides = screen.getAllByRole("img");
    expect(slides).toHaveLength(images.length);
  });
});
