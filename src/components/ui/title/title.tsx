import { titleFont } from "@/config/fonts";

interface TitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function Title({ title, subtitle, className }: TitleProps) {
  return (
    <div className={`mt-3 ${className}`}>
      <h1
        className={`${titleFont.className} antialiased text-4xl font-semibold my-7 px-5 md:px-0 `}
      >
        {title}
      </h1>

      {subtitle && <h3 className="text-xl mb-5">{subtitle}</h3>}
    </div>
  );
}
