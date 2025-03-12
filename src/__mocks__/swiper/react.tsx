import React from "react";

export const Swiper = ({ children, ...props }) => (
  <div data-testid="swiper" {...props}>
    {children}
  </div>
);

export const SwiperSlide = ({ children, ...props }) => (
  <div data-testid="swiper-slide" {...props}>
    {children}
  </div>
);
