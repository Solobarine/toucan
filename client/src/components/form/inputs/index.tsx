import { ChangeEvent } from "react";

const TextInput = ({
  type = "text",
  name,
  value,
  placeholder,
  handleChange,
  touched,
  error,
  className,
}: {
  type?: "text" | "email" | "password" | "number";
  name: string;
  value: string;
  placeholder: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  touched: boolean | undefined;
  error: string | undefined;
  className?: string;
}) => {
  return (
    <div className={`grid gap-2 ${className} text-sm`}>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`border rounded-md ${
          touched && error ? "border-red-500" : ""
        } p-2 h-9 dark:bg-gray-700 focus:outline-primary ${
          touched && !error ? "border-green-500" : ""
        }`}
      />
      {touched && error && (
        <p className="text-sm text-red-500 font-semibold">{error}</p>
      )}
    </div>
  );
};

export default TextInput;
