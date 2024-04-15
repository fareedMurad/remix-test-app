import React from "react";
import type { ReactNode, ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

type InputTypes = {
  id: string;
  register?: any;
  label: ReactNode;
  inputClassName?: string;
  onChange?: ComponentPropsWithoutRef<"input">["onChange"];
  value?: ComponentPropsWithoutRef<"input">["checked"];
  checked?: boolean;
  name?: string;
};

const CheckInput = ({
  id,
  register,
  label,
  inputClassName,
  checked,
  name,
  ...rest
}: InputTypes) => {
  return (
    <>
      <div className="my-1.5">
        <div className="flex items-center">
          <input
            id={id}
            name={name}
            type="checkbox"
            checked={checked}
            {...rest}
            {...register}
            className={twMerge(
              "after:bg-seccessCheck after:bg-center after:bg-no-repeat after:bg-[#0a7aff] w-5 h-5 mr-3 min-w-[20px] max-w-[20px] ease-soft text-base rounded-sm after:rounded-sm after:ease-soft-in-out duration-250 relative float-left cursor-pointer appearance-none border-2 border-solid border-[#C2BCB7] bg-transparent  align-top transition-all after:absolute after:flex after:h-full after:w-full after:items-center after:justify-center after:text-white after:opacity-0 after:transition-all checked:border-0 checked:border-transparent checked:bg-transparent checked:after:opacity-100",
              inputClassName
            )}
          />
          {label}
        </div>
      </div>
    </>
  );
};

export default CheckInput;
