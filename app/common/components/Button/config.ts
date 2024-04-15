import { cva } from "cva";

const config = cva(
  [
    "flex content-center justify-center",
    "focus:outline-none",
    "focus:border-orange",
    "focus:border-inside",
    "cursor-pointer",
    "disabled:opacity-30",
    "disabled:cursor-not-allowed",
  ],
  {
    variants: {
      variant: {
        cta: ["bg-orange", "text-white"],
        "cta-naked": ["bg-#00000000", "text-white", "border", "border-orange"],
        primary: ["bg-darknavy", "text-white"],
        "borders-only": [
          "bg-#00000000",
          "text-orange",
          "border",
          "border-orange",
        ],
        "invisible-background": ["bg-#00000000"],
      },
      size: {
        md: ["px-6", "py-4"],
        sm: ["px-4", "py-2.5"],
        none: "",
      },
      font: {
        montserrat: "font-Calibri",
        wadik: "font-Calibri",
        lato: "font-Lato",
        spartan: "font-Spartan",
        inter: "font-Inter",
      },
      weight: {
        bold: "font-bold",
        normal: "font-normal",
      },
      width: {
        full: "w-max",
        none: "max-w-none",
      },
      margin: {
        auto: "mx-auto",
        none: "",
      },
      rounded: {
        lg: "rounded-2xl",
        md: "rounded-xl",
        sm: "rounded",
        none: "",
      },
      leading: {
        default: "leading-5",
        max: "leading-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      font: "montserrat",
      width: "full",
      rounded: "md",
      weight: "bold",
      margin: "auto",
      leading: "default",
    },
  }
);

export default config;
