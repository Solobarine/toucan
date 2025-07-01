import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Sun, Moon } from "lucide-react";
import { AppDispatch, RootState } from "../../features/store";
import { toggleTheme } from "../../features/slices/settings";

type ThemeSwitchProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ ...props }) => {
  const dispatch: AppDispatch = useDispatch();
  const { isDarkTheme } = useSelector((state: RootState) => state.settings);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      aria-label={`Switch to ${isDarkTheme ? "light" : "dark"} theme`}
      title={`Switch to ${isDarkTheme ? "light" : "dark"} theme`}
      className={`
        p-2 rounded-full
        text-gray-500 dark:text-gray-400
        hover:bg-gray-100 dark:hover:bg-stone-700
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
        transition-colors duration-200 ease-in-out
        ${props.className || ""}
      `}
      {...props}
    >
      {isDarkTheme ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
};

export default ThemeSwitch;
