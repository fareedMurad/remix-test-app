import type { VariantProps } from "cva";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";
import config from "./config";

export interface Properties
  extends ComponentPropsWithoutRef<"button">,
    VariantProps<typeof config> {
  readonly icon?: string;
}

const Button = forwardRef<HTMLButtonElement, Properties>(
  (
    {
      children,
      variant,
      size,
      font,
      icon,
      width,
      rounded,
      margin,
      weight,
      className,
      disabled,
      leading,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        {...props}
        disabled={disabled}
        className={twMerge(
          config({
            variant,
            size,
            font,
            width,
            rounded,
            weight,
            margin,
            leading,
            className,
          })
        )}
      >
        {icon && (
          <span className="mr-3">
            <img src={icon} alt="" />
          </span>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
