import { ButtonHTMLAttributes } from "react";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (e?: any) => void;
}

const PrimaryButton = ({
  className = "",
  children,
  onClick,
  ...props
}: PrimaryButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={
        "text-sm px-4 py-1 rounded-lg shadow-md text-white bg-primary font-semibold " +
        className
      }
      {...props}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
