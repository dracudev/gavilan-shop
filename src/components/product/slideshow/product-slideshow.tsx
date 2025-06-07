"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperObject } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./slideshow.css";
import { useState } from "react";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export function ProductSlideshow({ images, title, className }: Props) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

  return (
    <div
      className={`max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto ${className}`}
    >
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#000",
            "--swiper-pagination-color": "#000",
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation
        autoplay={{ delay: 3500 }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2 h-80 w-full"
        role="swiper1"
      >
        {images.map((image) => (
          <SwiperSlide key={image}>
            <Image
              src={image}
              alt={title}
              width={400}
              height={400}
              className="rounded-xl object-cover w-full h-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode
        watchSlidesProgress
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper mt-2 h-20"
      >
        {images.map((image) => (
          <SwiperSlide key={image} data-testid="swiper-slide">
            <Image
              src={image}
              alt={title}
              width={80}
              height={80}
              className="rounded-xl object-cover w-full h-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
