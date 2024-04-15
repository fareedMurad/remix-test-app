import { useId, type ComponentPropsWithoutRef } from "react";
import {
  Controller,
  useController,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { cn, hasError } from "../../../utils/utils";

type InputType = "input" | "textarea";

export enum ErrorPosition {
  TOP,
  BOTTOM,
}

interface Properties<C extends FieldValues> {
  readonly control: Control<C>;
  readonly name: Path<C>;
  readonly rules?: any;
  readonly label?: string | React.ReactNode;
  readonly as?: InputType;
  readonly labelClassName?: string;
  readonly placeholder?: string;
  readonly disabled?: boolean;
  readonly inputClassName?: string;
  readonly className?: string;
  readonly errorPosition?: ErrorPosition;
  readonly type?: ComponentPropsWithoutRef<"input">["type"];
  readonly autoComplete?: ComponentPropsWithoutRef<"input">["autoComplete"];
  readonly id?: string;
  readonly required?: boolean;
  readonly errorClassName?: string;
}

const isValid = (errorMessage?: string) => !hasError(errorMessage);

const InputField = <C extends FieldValues = FieldValues>({
  label,
  placeholder,
  control,
  name,
  rules,
  as = "input",
  inputClassName,
  labelClassName,
  disabled,
  className,
  errorPosition = ErrorPosition.BOTTOM,
  type,
  autoComplete,
  id,
  required,
  errorClassName,
}: Properties<C>) => {
  const generatedId = useId();
  const {
    fieldState: { error },
  } = useController<C>({
    name,
    control,
  });
  const errorMessage = error?.message;

  const AsInput = as;
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur, value, name } }) => {
        return (
          <div
            className={twMerge(
              "flex flex-col py-2.5 lg:py-5 lg:py-0 w-full lg:w-auto",
              className
            )}
          >
            <label
              className={cn(
                "text-gray font-medium text-base mb-1",
                disabled && "opacity-[30%]",
                labelClassName
              )}
              htmlFor={id || generatedId}
            >
              {label}
              {required && <span className="text-artyRed p-0 ml-1">*</span>}
              {errorPosition === ErrorPosition.TOP && hasError(errorMessage) ? (
                <p className={twMerge("text-alert", errorClassName)}>
                  {errorMessage}
                </p>
              ) : null}
            </label>
            <AsInput
              disabled={disabled}
              placeholder={placeholder}
              onChange={onChange}
              value={value}
              name={name}
              id={id || generatedId}
              onBlur={onBlur}
              type={type}
              required={required}
              autoComplete={autoComplete}
              className={twMerge(
                "border rounded py-2 px-3",
                disabled && "opacity-[30%]",
                isValid(errorMessage) && "border-gray",
                hasError(errorMessage) && "border-alert",
                inputClassName
              )}
            />
            {hasError(errorMessage) &&
            errorPosition === ErrorPosition.BOTTOM ? (
              <p className={twMerge("text-alert", errorClassName)}>
                {errorMessage}
              </p>
            ) : null}
          </div>
        );
      }}
    />
  );
};

export default InputField;
