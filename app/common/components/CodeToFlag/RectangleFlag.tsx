import React from "react";
import { twMerge } from "tailwind-merge";
import {
  FlagIcon,
  type FlagIconCode,
  type FlagIconProps,
} from "react-flag-kit";

interface RectangleFlagProps extends FlagIconProps {
  code: FlagIconCode;
  className?: string;
}

const RectangleFlag: React.FC<RectangleFlagProps> = ({
  code,
  className,
  ...rest
}) => {
  return (
    <div className={twMerge("overflow-hidden w-6 h-6", className)}>
      <FlagIcon {...rest} code={code} />
    </div>
  );
};

export default RectangleFlag;
