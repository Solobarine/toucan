import type React from "react";
import type { ButtonHTMLAttributes } from "react";
import { clsx } from "clsx";

interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  className,
  children,
  onClick,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "inline-flex items-center justify-center",
        "rounded-lg shadow-md",
        "px-4 py-2",
        "text-sm font-semibold",
        "text-white bg-secondary",
        "transition-colors duration-200",
        "hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
