import * as React from "react";
import { SVGProps } from "react";
const Star = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="#D3A82D"
    viewBox="0 -960 960 960"
    {...props}
  >
    <path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z" />
  </svg>
);
export default Star;
