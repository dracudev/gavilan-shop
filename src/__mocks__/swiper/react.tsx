import React, { HTMLAttributes, ReactNode } from "react";

interface SwiperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const Swiper = ({ children, role }: SwiperProps) => (
  <div data-testid="swiper" role={role}>
    {children}
  </div>
);

interface SwiperSlideProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const SwiperSlide = ({ children }: SwiperSlideProps) => (
  <div data-testid="swiper-slide">{children}</div>
);

jest.mock("swiper/react", () => ({
  Swiper: Swiper,
  SwiperSlide: SwiperSlide,
}));
