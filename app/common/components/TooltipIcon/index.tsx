import Tooltip from "@fareeds-remix-app/common/components/Tooltip";
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props {
  content: string;
  icon: string | ReactNode;
  width?: number;
  side?: "top" | "left" | "right" | "bottom";
  sideOffset?: number;
  className?: string;
  triggerClassNames?: string;
}

const TooltipIcon: React.FC<Props> = ({
  content,
  icon,
  width = 170,
  side = "top",
  sideOffset = 15,
  className,
  triggerClassNames,
}) => {
  return (
    <Tooltip
      options={{ delayDuration: 300 }}
      contentOptions={{ side, sideOffset }}
      triggerClassNames={triggerClassNames}
      content={
        <div
          className={twMerge(
            "px-3 py-2 bg-darknavy rounded-md text-white text-xs font-normal text-center",
            className
          )}
          style={{ width }}
        >
          {content}
        </div>
      }
    >
      {typeof icon === "string" ? (
        <img src={icon} alt="cursor-default" />
      ) : (
        icon
      )}
    </Tooltip>
  );
};

export default TooltipIcon;
