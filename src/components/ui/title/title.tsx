import { titleFont } from "@/config/fonts";
import clsx from "clsx";

interface TitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  align?: "left" | "center" | "right";
}

const sizeClasses = {
  sm: "text-2xl",
  md: "text-3xl",
  lg: "text-4xl",
  xl: "text-5xl",
};

const alignClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export function Title({
  title,
  subtitle,
  className,
  size = "lg",
  align = "left",
}: TitleProps) {
  return (
    <div className={clsx("space-y-2", alignClasses[align], className)}>
      <h1
        className={clsx(
          titleFont.className,
          "font-semibold text-text-primary tracking-tight text-balance",
          sizeClasses[size]
        )}
      >
        {title}
      </h1>

      {subtitle && (
        <p
          className={clsx(
            "text-lg text-text-secondary font-medium leading-relaxed text-pretty",
            align === "center" ? "max-w-2xl mx-auto" : "max-w-2xl"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
