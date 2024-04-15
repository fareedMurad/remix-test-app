import * as RadixTooltip from "@radix-ui/react-tooltip";
import type { FC, ReactNode } from "react";

type TooltipProps = {
  content: ReactNode;
  children: ReactNode;
  options?: Omit<RadixTooltip.TooltipProviderProps, "children">;
  contentOptions?: RadixTooltip.TooltipContentProps;
  triggerClassNames?: string;
  onClick?: () => void;
};

const Tooltip: FC<TooltipProps> = ({
  children,
  content,
  options,
  contentOptions,
  triggerClassNames,
  onClick,
}) => {
  return (
    <RadixTooltip.Provider {...options}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger className={triggerClassNames} onClick={onClick}>
          {children}
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            className="z-50"
            alignOffset={0}
            {...contentOptions}
          >
            {content}
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};

export default Tooltip;
