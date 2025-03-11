import { useTheme } from "@/context/theme-context";

export const useLogo = () => {
  const { theme } = useTheme();
  const logoSrc =
    theme === "dark" ? "/img/logo-white.png" : "/img/logo-black.png";
  return logoSrc;
};
