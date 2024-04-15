import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import { twMerge } from "tailwind-merge";
import Button from "../Button";

interface TabItemProps {
  label: string;
  className?: string;
  selectedClassName?: string;
  onClick?: () => void;
}

export const TabItem = ({
  label,
  className,
  selectedClassName,
  onClick,
}: TabItemProps) => {
  return (
    <Tab as={Fragment}>
      {({ selected }) => (
        <Button
          className={twMerge(
            "px-4 py-2 text-white text-sm lg:text-base font-Calibri font-semibold cursor-pointer",
            className,
            selected ? "border-b-2 border-orange" : "",
            selected ? selectedClassName : ""
          )}
          onClick={onClick}
        >
          {label}
        </Button>
      )}
    </Tab>
  );
};
