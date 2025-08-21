import { useTheme } from "@/components/providers/theme-provider";

export const useLogo = () => {
  const { theme } = useTheme();
  const logoSrc =
    theme === "dark" ? "/img/logo-white.png" : "/img/logo-black.png";
  return logoSrc;
};
