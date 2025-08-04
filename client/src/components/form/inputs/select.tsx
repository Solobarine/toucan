"use client";

import { useState, type ChangeEvent } from "react";
import {
  Check,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  ListFilter,
} from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface SelectInputProps {
  name: string;
  value: string;
  options: Option[];
  placeholder?: string;
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  touched: boolean | undefined;
  error: string | undefined;
  className?: string;
  label?: string;
  icon?: boolean;
  disabled?: boolean;
}

const SelectInput = ({
  name,
  value,
  options,
  placeholder = "Select an option",
  handleChange,
  touched,
  error,
  className = "",
  label,
  icon = true,
  disabled = false,
}: SelectInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const hasError = touched && error;
  const isValid = touched && !error && value.length > 0;

  const baseInputClasses = `
    w-full h-12 px-4 py-3 bg-white dark:bg-stone-800 
    border-2 rounded-xl transition-all duration-200
    text-stone-900 dark:text-stone-100 
    placeholder-stone-500 dark:placeholder-stone-400
    focus:outline-none focus:ring-0
    disabled:opacity-50 disabled:cursor-not-allowed
    ${icon ? "pl-12" : ""}
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
        {icon && (
          <div className={iconClasses}>
            <ListFilter className="w-5 h-5" />
          </div>
        )}

        {/* Select */}
        <select
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          onFocus={() => {
            setIsFocused(true);
            setDropdownOpen(true);
          }}
          onBlur={() => {
            setIsFocused(false);
            setDropdownOpen(false);
          }}
          disabled={disabled}
          className={`${baseInputClasses} appearance-none`}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Chevron */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500 pointer-events-none">
          {dropdownOpen ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </div>

        {/* Validation Icon */}
        {(hasError || isValid) && (
          <div className="absolute right-10 top-1/2 -translate-y-1/2">
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

export default SelectInput;
