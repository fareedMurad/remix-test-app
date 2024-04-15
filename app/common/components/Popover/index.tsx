import React, { useState } from "react";
import { Popover as HeadLessPopover } from "@headlessui/react";
import { cn } from "../../utils/utils";
import { usePopper, type PopperChildrenProps } from "react-popper";

interface Props {
  triggerButton: React.ReactNode;
  content: React.ReactNode;
  className?: string;
  triggerClassName?: string;
  panelClassName?: string;
  customPlacement?: PopperChildrenProps["placement"];
}

const Popover: React.FC<Props> = ({
  triggerButton,
  content,
  className,
  triggerClassName,
  panelClassName,
  customPlacement,
}) => {
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: customPlacement ? customPlacement : "bottom-start",
  });

  return (
    <HeadLessPopover className={cn(className)}>
      <HeadLessPopover.Button
        ref={setReferenceElement}
        className={cn(
          "focus:outline-none focus-visible:none h-fit",
          triggerClassName
        )}
      >
        {triggerButton}
      </HeadLessPopover.Button>

      <HeadLessPopover.Panel
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
        className={cn("z-10", panelClassName)}
      >
        {content}
      </HeadLessPopover.Panel>
    </HeadLessPopover>
  );
};

export default Popover;
