import React, { HTMLAttributes, ReactNode } from "react";

interface SwiperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const Swiper = ({ children, ...props }: SwiperProps) => (
  <div data-testid="swiper" {...props}>
    {children}
  </div>
);

interface SwiperSlideProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const SwiperSlide = ({ children, ...props }: SwiperSlideProps) => (
  <div data-testid="swiper-slide" {...props}>
    {children}
  </div>
);

jest.mock("swiper/react", () => ({
  Swiper: Swiper,
  SwiperSlide: SwiperSlide,
}));
