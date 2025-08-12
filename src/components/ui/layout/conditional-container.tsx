"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface ConditionalContainerProps {
  children: ReactNode;
}

/**
 * Applies container constraints to all pages except the homepage,
 * where the hero section needs full viewport width
 */
export const ConditionalContainer = ({
  children,
}: ConditionalContainerProps) => {
  const pathname = usePathname();

  const isHomepage =
    pathname === "/" ||
    pathname === "/en" ||
    pathname === "/es" ||
    pathname.match(/^\/[a-z]{2}$/) ||
    pathname.endsWith("/(public)") ||
    pathname.match(/^\/[a-z]{2}\/(public)?$/);

  if (isHomepage) {
    return <>{children}</>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {children}
    </div>
  );
};
