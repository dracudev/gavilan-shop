"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./slideshow.css";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import Image from "next/image";

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export function ProductSlideshowMobile({ images, title, className }: Props) {
  return (
    <div className={`overflow-hidden rounded-lg ${className || ""}`}>
      <Swiper
        style={{
          width: "100%",
          height: "400px",
        }}
        pagination={true}
        autoplay={{ delay: 3500 }}
        modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiper2 rounded-lg overflow-hidden"
        role="container"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              src={image}
              alt={title}
              width={600}
              height={400}
              className="object-fill rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
