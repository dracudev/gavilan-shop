import { ReactNode, HTMLAttributes } from "react";

interface SwiperSlideProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const SwiperSlide = ({ children, ...props }: SwiperSlideProps) => (
  <div data-testid="swiper-slide" {...props}>
    {children}
  </div>
);

export default SwiperSlide;
