import React from "react";
import styles from "./styles.module.css";

const defaultOptions = {
  invertedIconLogic: false,
};

interface ToggleButtonProps {
  isDark: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  invertedIconLogic?: boolean;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  isDark,
  onChange,
  invertedIconLogic = defaultOptions.invertedIconLogic,
}) => (
  <label
    className={`${styles.container} ${
      isDark ? styles.IsDark : styles.IsLight
    } mx-2 cursor-pointer`}
    title={isDark ? "Activate light mode" : "Activate dark mode"}
    aria-label={isDark ? "Activate light mode" : "Activate dark mode"}
  >
    <input
      type="checkbox"
      defaultChecked={invertedIconLogic ? !isDark : isDark}
      onChange={onChange}
    />
    <div />
  </label>
);
