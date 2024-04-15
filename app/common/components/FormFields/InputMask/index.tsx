import type { FC } from "react";
import { PatternFormat } from "react-number-format";
import { twMerge } from "tailwind-merge";

interface Properties {
  readonly label: string;
  readonly mask: string;
  readonly className?: string;
  readonly placeholder?: string;
  readonly required?: boolean;
  readonly labelClasses?: string;
  readonly inputClasses?: string;
  readonly wrapperInputClasses?: string;
  readonly wrapperLabelClassName?: string;
  readonly value?: string;
  readonly onChange?: () => void;
}

const InputMaskField: FC<Properties> = ({
  label,
  mask,
  value,
  className,
  required,
  labelClasses,
  inputClasses,
  wrapperInputClasses,
  wrapperLabelClassName,
  placeholder = "",
  onChange,
}) => {
  return (
    <div className={twMerge(className)}>
      <div className="flex flex-col flex-row-reverse">
        <div className={wrapperLabelClassName}>
          <span
            className={twMerge(
              "font-bold font-Calibri text-sm mb-1",
              labelClasses
            )}
          >
            {label}
          </span>
          {required && (
            <span className="text-alert font-bold ml-1 text-[11px]">*</span>
          )}
        </div>
        <div className={wrapperInputClasses}>
          <PatternFormat
            format={mask}
            mask="_"
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            className={twMerge("border border-silver px-5 py-3", inputClasses)}
          />
        </div>
      </div>
    </div>
  );
};

export default InputMaskField;
