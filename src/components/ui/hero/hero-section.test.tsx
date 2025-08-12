import { render, screen } from "@testing-library/react";
import { HeroSection } from "./hero-section";
import React from "react";

// Types for mocks
interface MockMotionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

interface MockImageProps {
  alt: string;
  src: string;
  [key: string]: unknown;
}

interface MockLinkProps {
  children: React.ReactNode;
  href: string;
  [key: string]: unknown;
}

// Mock Framer Motion
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: MockMotionProps) => (
      <div {...props}>{children}</div>
    ),
    h1: ({ children, ...props }: MockMotionProps) => (
      <h1 {...props}>{children}</h1>
    ),
    p: ({ children, ...props }: MockMotionProps) => (
      <p {...props}>{children}</p>
    ),
    section: ({ children, ...props }: MockMotionProps) => (
      <section {...props}>{children}</section>
    ),
    button: ({ children, ...props }: MockMotionProps) => (
      <button {...props}>{children}</button>
    ),
  },
  useScroll: () => ({
    scrollYProgress: { get: () => 0, set: () => {}, on: () => {} },
  }),
  useTransform: () => ({ get: () => "0%", set: () => {}, on: () => {} }),
}));

// Mock Next.js Image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt, src }: MockImageProps) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} src={src} />
  ),
}));

// Mock Next.js Link
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ children, href, ...props }: MockLinkProps) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("HeroSection", () => {
  it("renders with default props", () => {
    render(<HeroSection />);

    expect(
      screen.getByText("Crafting Timeless Elegance Since 1880")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Over a century of artisanal hats/)
    ).toBeInTheDocument();
    expect(screen.getByText("Explore Collection")).toBeInTheDocument();
    expect(screen.getByText("Our Story")).toBeInTheDocument();
  });

  it("renders with custom props", () => {
    const customProps = {
      headline: "Custom Headline",
      subheading: "Custom subheading text",
      primaryCtaText: "Shop Now",
      secondaryCtaText: "Learn More",
    };

    render(<HeroSection {...customProps} />);

    expect(screen.getByText("Custom Headline")).toBeInTheDocument();
    expect(screen.getByText("Custom subheading text")).toBeInTheDocument();
    expect(screen.getByText("Shop Now")).toBeInTheDocument();
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  it("has proper accessibility attributes", () => {
    render(<HeroSection />);

    const heroSection = screen.getByRole("banner");
    expect(heroSection).toHaveAttribute(
      "aria-label",
      "El Gavilán Hero Section"
    );

    const primaryCta = screen.getByRole("link", { name: /Explore Collection/ });
    expect(primaryCta).toHaveAttribute("aria-label");

    const secondaryCta = screen.getByRole("link", { name: /Our Story/ });
    expect(secondaryCta).toHaveAttribute("aria-label");
  });

  it("renders heritage highlights", () => {
    render(<HeroSection />);

    expect(screen.getByText("Artisanal Craftsmanship")).toBeInTheDocument();
    expect(screen.getByText("Premium Materials")).toBeInTheDocument();
    expect(screen.getByText("Traditional Excellence")).toBeInTheDocument();
  });

  it("renders brand badge with establishment year", () => {
    render(<HeroSection />);

    expect(screen.getByText("Est. 1880 • Alicante, Spain")).toBeInTheDocument();
  });

  it("renders scroll indicator", () => {
    render(<HeroSection />);

    expect(screen.getByText("Scroll to discover")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<HeroSection className="custom-class" />);

    const heroSection = screen.getByRole("banner");
    expect(heroSection).toHaveClass("custom-class");
  });
});
