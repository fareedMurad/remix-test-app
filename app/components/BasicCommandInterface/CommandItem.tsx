import React from "react";
import { Option } from "~/common/components/Select";
import { cn } from "~/common/utils/utils";

const CommandItem = ({
  option,
  isActive,
  onSelect,
}: {
  option: Option;
  isActive: boolean;
  onSelect: (option: Option) => void;
}) => {
  return (
    <li
      className={cn(
        "list-none relative h-12 flex items-center pl-4 cursor-pointer",
        {
          "before:content-[''] before:h-full before:w-1 before:bg-teal before:absolute before:left-0 bg-cyan50":
            isActive,
        }
      )}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(option);
        alert("hey");
      }}
    >
      <div className="flex items-center gap-2">
        <span className="">{option.icon}</span>
        <span>{option.label}</span>
      </div>
    </li>
  );
};
export default CommandItem;
