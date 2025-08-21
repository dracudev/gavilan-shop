import Link from "next/link";

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  description?: string;
  onClick: () => void;
  disabled?: boolean;
}

export default function SidebarLink({
  href,
  icon,
  label,
  description,
  onClick,
  disabled = false,
}: SidebarLinkProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick();
  };
  return (
    <Link
      href={disabled ? "#" : href}
      onClick={handleClick}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      className={[
        "flex items-center gap-3 p-3 rounded-md transition-all duration-200 group min-h-[44px]",
        disabled
          ? "text-text-muted  opacity-60 pointer-events-none"
          : "text-text-secondary hover:text-text-primary hover:bg-surface-secondary cursor-pointer",
      ].join(" ")}
    >
      <span
        className={
          disabled
            ? "text-text-muted"
            : "text-text-muted group-hover:text-primary transition-colors duration-200"
        }
      >
        {icon}
      </span>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm truncate">{label}</div>
        {description && (
          <div className="text-xs text-text-muted mt-0.5 truncate">
            {description}
          </div>
        )}
      </div>
    </Link>
  );
}
