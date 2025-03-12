import type { Size } from "@/interfaces";
import clsx from "clsx";

interface SizeSelectorProps {
  availableSizes: Size[];
  selectedSize: Size;
  onSizeChange: (size: Size) => void;
}

export function SizeSelector({
  selectedSize,
  availableSizes,
  onSizeChange,
}: SizeSelectorProps) {
  return (
    <div className="my-5 ">
      <h3 className="font-bold mb-4">Size</h3>

      <div className="flex">
        {availableSizes.map((size) => (
          <button
            key={size}
            className={clsx(
              "mx-2 hover:underline decoration-[var(--primary-color)] decoration-2 text-lg",
              {
                underline: size === selectedSize,
              }
            )}
            onClick={() => {
              if (size !== selectedSize) {
                onSizeChange(size);
              }
            }}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
