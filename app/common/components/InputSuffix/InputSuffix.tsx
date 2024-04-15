import React, { type ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  suffix: React.ReactNode;
  label?: string;
  placeholder?: string;
  suffixDirection?: "left" | "right";
  className?: string;
  inputClassName?: string;
  contentClassName?: string;
  suffixClassName?: string;
  labelClassName?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const InputSuffix = ({
  suffix,
  label,
  placeholder,
  suffixDirection = "left",
  className,
  inputClassName,
  contentClassName,
  suffixClassName,
  labelClassName,
  value,
  onChange,
}: Props) => (
  <div className={className}>
    {label && (
      <label
        className={twMerge(
          "inline-block w-full text-sm font-medium",
          labelClassName
        )}
      >
        {label}
      </label>
    )}
    <div className={twMerge("relative flex items-center", contentClassName)}>
      {suffixDirection === "left" && (
        <span
          className={twMerge(
            "material-symbols-outlined absolute left-2 transition-all duration-200 ease-in-out",
            suffixClassName
          )}
        >
          {suffix}
        </span>
      )}
      <input
        id="4"
        type="text"
        placeholder={placeholder}
        className={twMerge(
          "relative w-full rounded-[5px] bg-light pr-2.5 pl-1 font-bold text-xs border-1 border-orange transition-all duration-200 ease-in-out h-[29px]",
          inputClassName
        )}
        value={value}
        onChange={onChange}
      />
      {suffixDirection === "right" && (
        <span
          className={twMerge(
            "material-symbols-outlined absolute right-2 transition-all duration-200 ease-in-out",
            suffixClassName
          )}
        >
          {suffix}
        </span>
      )}
    </div>
  </div>
);
