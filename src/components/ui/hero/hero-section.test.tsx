import { render, screen } from "@testing-library/react";
import { HeroSection } from "./hero-section";
import { HERO_VARIANTS } from "./hero-variants";
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

  it("renders with custom variant", () => {
    const customVariant = {
      id: "test",
      name: "Test Variant",
      headline: "Custom Headline",
      subheading: "Custom subheading text",
      primaryCtaText: "Shop Now",
      secondaryCtaText: "Learn More",
      theme: "default" as const,
    };

    render(<HeroSection variant={customVariant} />);

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

    const primaryCta = screen.getByRole("button", {
      name: /Explore Collection/,
    });
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

  it("renders +145 years statistics", () => {
    render(<HeroSection />);

    expect(screen.getByText("+145")).toBeInTheDocument();
    expect(screen.getByText("Years of Excellence")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Authentic Spanish craftsmanship from the heart of Alicante"
      )
    ).toBeInTheDocument();
  });

  it("renders heritage variant by default", () => {
    render(<HeroSection />);

    expect(
      screen.getByText("Crafting Timeless Elegance Since 1880")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Over a century of artisanal hats, bags, and accessories, crafted for those who value quality and style."
      )
    ).toBeInTheDocument();
  });

  it("renders different variants correctly", () => {
    render(<HeroSection variant={HERO_VARIANTS.elegant} />);

    expect(screen.getByText("Elegance Since 1880")).toBeInTheDocument();
    expect(
      screen.getByText(/Discover our collection of premium leather goods/)
    ).toBeInTheDocument();
    expect(screen.getByText("Shop Now")).toBeInTheDocument();
    expect(screen.getByText("Learn More")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<HeroSection className="custom-class" />);

    const heroSection = screen.getByRole("banner");
    expect(heroSection).toHaveClass("custom-class");
  });
});
