import type { ReactNode } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller, useController } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { twMerge } from "tailwind-merge";
import { hasError } from "../../../utils/utils";

interface Props<C extends FieldValues> {
  readonly control: Control<C>;
  readonly name: Path<C>;
  readonly label: string | ReactNode;
  readonly mask: string;
  readonly labelClassName?: string;
  readonly inputClassName?: string;
}

export const MaskInputField = <C extends FieldValues = FieldValues>({
  label,
  control,
  name,
  mask,
  labelClassName,
  inputClassName,
}: Props<C>) => {
  const {
    fieldState: { error },
  } = useController<C>({
    name,
    control,
  });
  const errorMessage = error?.message;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }: any) => {
        return (
          <div className="w-full flex flex-col">
            <label
              className={twMerge(
                "text-gray font-medium text-base mb-1",
                labelClassName
              )}
            >
              {label}
            </label>
            <PatternFormat
              name={name}
              format={mask}
              value={value}
              onChange={onChange}
              mask="_"
              className={twMerge(
                "bg-transparent border rounded py-2 px-4 border-white text-white",
                inputClassName
              )}
            />
            {hasError(errorMessage) ? (
              <p className="text-alert">{errorMessage}</p>
            ) : null}
          </div>
        );
      }}
    />
  );
};
