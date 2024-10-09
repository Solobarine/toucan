import { ReactNode } from "react";

const SecondaryButton = ({
  children,
  onClick,
  ...props
}: {
  children: ReactNode;
  onClick: () => void;
}) => {
  return (
    <button
      {...props}
      onClick={onClick}
      className="text-sm px-4 py-1 rounded-lg shadow-md text-white bg-secondary font-semibold"
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
