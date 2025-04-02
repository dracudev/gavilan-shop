import { useEffect } from "react";

export function useImagePreloader(images: string[]) {
  useEffect(() => {
    const preloadImages = images.map((src) => {
      const img = new window.Image();
      img.src = src;
      return img;
    });

    return () => {
      preloadImages.forEach((img) => {
        img.src = "";
      });
    };
  }, [images]);
}
