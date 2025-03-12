import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mock CSS imports
jest.mock("./slideshow.css", () => ({}), { virtual: true });
jest.mock("swiper/css", () => ({}), { virtual: true });
jest.mock("swiper/css/free-mode", () => ({}), { virtual: true });
jest.mock("swiper/css/pagination", () => ({}), { virtual: true });

// Mock Swiper components
jest.mock("swiper/react");
jest.mock("swiper/modules");

// Now import the component after the mocks are set up
import { ProductSlideshowMobile } from "./product-slideshow-mobile";

describe("ProductSlideshowMobile", () => {
  const images = [
    "/images/product1.jpg",
    "/images/product2.jpg",
    "/images/product3.jpg",
  ];
  const title = "Sample Product";

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

    const slides = screen.getAllByTestId("swiper-slide");
    expect(slides).toHaveLength(images.length);
  });
});
