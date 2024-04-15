import type { ComponentPropsWithoutRef, FC } from "react";
import type { VariantProps } from "cva";
import { twMerge } from "tailwind-merge";
import { inputConfig, labelConfig } from "./config";

interface Properties
  extends ComponentPropsWithoutRef<"input">,
    VariantProps<typeof labelConfig>,
    VariantProps<typeof inputConfig> {
  readonly title: string;
  readonly required?: boolean;
  readonly inputClasses?: string;
  readonly titleClasses?: string;
}

const Checkbox: FC<Properties> = ({
  title,
  weight,
  inputMargin,
  required,
  className,
  inputClasses,
  titleClasses,
  ...props
}) => {
  return (
    <span className={twMerge("flex justify-between", className)}>
      <label
        className={twMerge(
          "flex content-start items-start cursor-pointer",
          labelConfig({ weight })
        )}
      >
        <input
          {...props}
          type="checkbox"
          required={required}
          className={twMerge(
            "cursor-pointer",
            inputConfig({ inputMargin }),
            inputClasses
          )}
        />
        <span className={twMerge("self-start", titleClasses)}>{title}</span>
      </label>
      {required && <span className="text-alert text-xs font-bold">*</span>}
    </span>
  );
};

export default Checkbox;
