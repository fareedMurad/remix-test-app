import type { ReactNode } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface Props<C extends FieldValues> {
  readonly control: Control<C>;
  readonly name: Path<C>;
  readonly label: string | ReactNode;
  readonly className?: string;
  readonly checkboxClass?: string;
  readonly labelClassName?: string;
  readonly required?: boolean;
}

export const CheckboxField = <C extends FieldValues = FieldValues>({
  label,
  control,
  name,
  className,
  required,
  checkboxClass,
  labelClassName,
}: Props<C>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        return (
          <label
            htmlFor={name}
            className={twMerge(
              "w-full flex items-center !mb-0 cursor-pointer select-none",
              className
            )}
          >
            <input
              id={name}
              className={twMerge("!w-6 !h-6 cursor-pointer", checkboxClass)}
              type="checkbox"
              value={value}
              onChange={onChange}
              name={name}
              required={required}
            />
            <div className={labelClassName}>
              {label}
              {required && <span className="text-alert">*</span>}
            </div>
          </label>
        );
      }}
    />
  );
};
