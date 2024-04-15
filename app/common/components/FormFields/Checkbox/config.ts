import { cva } from "cva";

export const labelConfig = cva([], {
  variants: {
    weight: {
      bold: "font-bold",
    },
    label: {
      xs: "text-xs",
    },
  },
  defaultVariants: {
    label: "xs",
    weight: "bold",
  },
});

export const inputConfig = cva(
  [
    "text-blue",
    "border",
    "border-metal",
    "w-4",
    "h-4",
    "rounded",
    "appearance-none",
    "checked:bg-blue",
    "checked:border-blue",
    "shrink-0",
  ],
  {
    variants: {
      inputMargin: {
        xs: "mr-2",
      },
    },
    defaultVariants: {
      inputMargin: "xs",
    },
  }
);
