import * as React from "react";
import type { SVGProps } from "react";
const SvgCircleArrowDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="none"
    viewBox="0 0 22 22"
    {...props}
  >
    <path
      fill="currentColor"
      d="M11 0a11 11 0 1 1 0 22 11 11 0 0 1 0-22ZM5.5 8.8l5.5 5.5 5.5-5.5h-11Z"
    />
  </svg>
);
export default SvgCircleArrowDown;
