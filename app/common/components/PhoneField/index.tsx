import type { Value } from "react-phone-number-input";
import {
  type Control,
  type FieldValues,
  type Path,
  type PathValue,
  Controller,
  useController,
} from "react-hook-form";
import {
  type ComponentPropsWithoutRef,
  type LegacyRef,
  forwardRef,
  useState,
} from "react";
import PhoneInput from "react-phone-number-input/input";
import { twMerge } from "tailwind-merge";

export enum ErrorPosition {
  TOP,
  BOTTOM,
}

interface Properties<C extends FieldValues> {
  readonly control: Control<C>;
  readonly name: Path<C>;
  readonly rules?: any;
  readonly label?: string | JSX.Element;
  readonly placeholder?: string;
  readonly disabled?: boolean;
  readonly isRequired?: boolean;
  readonly errorPosition?: ErrorPosition;
  readonly className?: string;
  readonly labelClassName?: string;
  readonly errorClassName?: string;
  readonly inputClassName?: string;
}

type ForwardedInputProperties = ComponentPropsWithoutRef<"input"> & {
  readonly error?: string;
  readonly inputClassName?: string;
};

const ForwardedInput = forwardRef(
  (
    props: ForwardedInputProperties,
    ref: LegacyRef<HTMLInputElement> | undefined
  ) => {
    const {
      name,
      placeholder,
      disabled,
      onBlur,
      error,
      inputClassName,
      ...restProps
    } = props;

    return (
      <input
        ref={ref}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        onBlur={onBlur}
        className={twMerge(
          "py-2 px-3 disabled:opacity-30 disabled:cursor-not-allowed h-12 rounded-[5px] bg-soapStone text-black w-full",
          error?.length ? "border-alert" : "border-darkgray",
          inputClassName
        )}
        type="tel"
        autoComplete="tel"
        {...restProps}
      />
    );
  }
);
ForwardedInput.displayName = "ForwardedInput";

const PhoneField = <C extends FieldValues>({
  control,
  name,
  rules,
  label,
  placeholder,
  disabled,
  isRequired,
  errorPosition = ErrorPosition.BOTTOM,
  className,
  labelClassName,
  errorClassName,
  inputClassName,
}: Properties<C>) => {
  const [value, setValue] = useState<Value>();

  const {
    fieldState: { error },
    field: { onChange },
  } = useController<C>({
    name,
    control,
  });

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onBlur, name } }) => {
        return (
          <div
            className={twMerge(
              "flex flex-col max-w-none lg:max-w-[334px] w-full",
              className
            )}
          >
            <label
              className={twMerge(
                "font-Calibri text-xl !mb-2",
                disabled && "opacity-50",
                labelClassName
              )}
            >
              {label}
              {isRequired && <span className="text-red">*</span>}
              {errorPosition === ErrorPosition.TOP &&
                error?.message?.length && (
                  <span className={twMerge("text-danger", errorClassName)}>
                    {error.message}
                  </span>
                )}
            </label>

            <PhoneInput
              value={value}
              international
              withCountryCallingCode
              onChange={(value) => {
                setValue(value);
                onChange((value ?? "") as PathValue<C, Path<C>>);
              }}
              name={name}
              placeholder={placeholder}
              disabled={disabled}
              error={error?.message}
              inputClassName={inputClassName}
              onBlur={onBlur}
              // @ts-ignore
              inputComponent={ForwardedInput}
            />
            {errorPosition === ErrorPosition.BOTTOM &&
              error?.message?.length && (
                <span className={twMerge("text-alert", errorClassName)}>
                  {error.message}
                </span>
              )}
          </div>
        );
      }}
    />
  );
};

export default PhoneField;
