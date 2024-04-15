import type { ReactNode } from "react";
import { Controller } from "react-hook-form";
import type { Control } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface IRadioOption {
  value: string;
  label: string | ReactNode;
  disabled?: boolean;
}

interface RadioGroupProps {
  label?: string;
  name: string;
  options: IRadioOption[];
  control: Control<any, any>;
  customItem?: (option: RadioGroupItemProps) => ReactNode;
  labelClassName?: string;
  className?: string;
}

export type RadioGroupItemProps = {
  option: IRadioOption;
  name: string;
  onChange: (event: any) => void;
  value?: string;
  defaultActive?: boolean;
  disabled?: boolean;
};

const RadioGroupItem = ({
  option,
  defaultActive,
  name,
  onChange,
}: RadioGroupItemProps) => {
  return (
    <>
      <input
        type="radio"
        id={option.value}
        name={name}
        value={option.value}
        onChange={onChange}
        className="hidden peer"
      />
      <label
        htmlFor={option.value}
        className={`inline-flex items-center justify-between w-full text-xs px-[19px] py-[3px] text-white border-[2px] rounded-lg cursor-pointer dark:border-gray-700   peer-checked:border-orange bg-darknavy  dark:text-gray-400 dark:bg-gray-800 ${
          defaultActive ? "border-orange" : ""
        }`}
      >
        {option.label}
      </label>
    </>
  );
};

const RadioGroupField = ({
  label,
  name,
  options,
  control,
  className,
  labelClassName,
  customItem = (props: RadioGroupItemProps) => <RadioGroupItem {...props} />,
}: RadioGroupProps) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: "Current password field is required",
      }}
      render={({ field: { onChange, value } }) => {
        return (
          <>
            <h4
              className={twMerge(
                "text-base font-bold font-Calibri mb-2.5",
                labelClassName
              )}
            >
              {label}
            </h4>
            <ul className={twMerge("flex gap-2.5 flex-wrap", className)}>
              {options.map((o, i) => (
                <li
                  key={i}
                  className={twMerge(
                    o.disabled && "opacity-30 cursor-not-allowed"
                  )}
                >
                  {customItem({
                    option: o,
                    name,
                    disabled: o.disabled,
                    onChange: o.disabled ? () => {} : onChange,
                    value,
                    defaultActive: value === o.value,
                  })}
                </li>
              ))}
            </ul>
          </>
        );
      }}
    />
  );
};

export default RadioGroupField;
