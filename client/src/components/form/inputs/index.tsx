"use client";

import { type ChangeEvent, useState } from "react";
import {
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  User,
  Mail,
  Lock,
  MessageSquare,
} from "lucide-react";

interface TextInputProps {
  type?: "text" | "email" | "password" | "number" | "textarea";
  name: string;
  value: string;
  placeholder: string;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  touched: boolean | undefined;
  error: string | undefined;
  className?: string;
  label?: string;
  icon?: boolean;
  disabled?: boolean;
  rows?: number;
}

const TextInput = ({
  type = "text",
  name,
  value,
  placeholder,
  handleChange,
  touched,
  error,
  className = "",
  label,
  icon = true,
  disabled = false,
  rows = 4,
}: TextInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const getIcon = () => {
    switch (type) {
      case "email":
        return <Mail className="w-5 h-5" />;
      case "password":
        return <Lock className="w-5 h-5" />;
      case "textarea":
        return <MessageSquare className="w-5 h-5" />;
      default:
        return <User className="w-5 h-5" />;
    }
  };

  const getInputType = () => {
    if (type === "password") {
      return showPassword ? "text" : "password";
    }
    return type === "textarea" ? "text" : type;
  };

  const hasError = touched && error;
  const isValid = touched && !error && value.length > 0;

  const baseInputClasses = `
    w-full px-4 py-3 bg-white dark:bg-stone-800 
    border-2 rounded-xl transition-all duration-200
    text-stone-900 dark:text-stone-100 
    placeholder-stone-500 dark:placeholder-stone-400
    focus:outline-none focus:ring-0
    disabled:opacity-50 disabled:cursor-not-allowed
    ${icon && type !== "textarea" ? "pl-12" : ""}
    ${type === "password" ? "pr-12" : ""}
    ${
      hasError
        ? "border-red-300 dark:border-red-600 focus:border-red-500 dark:focus:border-red-400 bg-red-50 dark:bg-red-900/10"
        : isValid
        ? "border-emerald-300 dark:border-emerald-600 focus:border-emerald-500 dark:focus:border-emerald-400 bg-emerald-50 dark:bg-emerald-900/10"
        : isFocused
        ? "border-purple-400 dark:border-purple-500 bg-purple-50 dark:bg-purple-900/10"
        : "border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600"
    }
  `;

  const iconClasses = `
    absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200
    ${
      hasError
        ? "text-red-500 dark:text-red-400"
        : isValid
        ? "text-emerald-500 dark:text-emerald-400"
        : isFocused
        ? "text-purple-500 dark:text-purple-400"
        : "text-stone-400 dark:text-stone-500"
    }
  `;

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-stone-700 dark:text-stone-300"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {/* Icon */}
        {icon && type !== "textarea" && (
          <div className={iconClasses}>{getIcon()}</div>
        )}

        {/* Input/Textarea */}
        {type === "textarea" ? (
          <textarea
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            rows={rows}
            className={`${baseInputClasses} resize-none min-h-[100px]`}
          />
        ) : (
          <input
            id={name}
            type={getInputType()}
            name={name}
            value={value}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            disabled={disabled}
            className={`${baseInputClasses} h-12`}
          />
        )}

        {/* Password Toggle */}
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 transition-colors duration-200"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}

        {/* Validation Icon */}
        {(hasError || isValid) && type !== "password" && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {hasError ? (
              <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400" />
            ) : (
              <Check className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
            )}
          </div>
        )}
      </div>

      {/* Error Message */}
      {hasError && (
        <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* Success Message */}
      {isValid && (
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
          <Check className="w-4 h-4 flex-shrink-0" />
          <p className="text-sm font-medium">Looks good!</p>
        </div>
      )}
    </div>
  );
};

export default TextInput;
