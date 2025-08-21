import clsx from "clsx";
import Image from "next/image";

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  fallbackColor?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  name,
  size = "md",
  className,
  fallbackColor,
}) => {
  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
    xl: "w-16 h-16 text-xl",
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getFallbackColor = () => {
    if (fallbackColor) return fallbackColor;

    // Generate color based on name
    if (name) {
      const colors = [
        "bg-primary/10 text-primary",
        "bg-secondary/10 text-secondary",
        "bg-accent/10 text-accent",
        "bg-info/10 text-info",
        "bg-success/10 text-success",
        "bg-warning/10 text-warning",
      ];

      const hash = name.split("").reduce((a, b) => {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
      }, 0);

      return colors[Math.abs(hash) % colors.length];
    }

    return "bg-surface-secondary text-text-muted";
  };

  if (src) {
    return (
      <div
        className={clsx(
          "relative rounded-full overflow-hidden",
          sizeClasses[size],
          className
        )}
      >
        <Image
          src={src}
          alt={alt || name || "Avatar"}
          fill
          className="object-cover"
          sizes="(max-width: 64px) 64px, (max-width: 48px) 48px, (max-width: 40px) 40px, 32px"
        />
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "flex items-center justify-center rounded-full font-medium",
        sizeClasses[size],
        getFallbackColor(),
        className
      )}
    >
      {name ? getInitials(name) : "?"}
    </div>
  );
};

export { Avatar };
