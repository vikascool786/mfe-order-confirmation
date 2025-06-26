import * as React from "react";
import { SVGProps } from "react";
const VText = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={102}
    height={25}
    fill="none"
    {...props}
  >
    <g fill="#21093A" clipPath="url(#a)">
      <path d="M.484.383h6.112l6.005 15.73h.068L18.78.384h5.734l-10.025 24H10.2L.483.383Zm30.791 0h5.357v24h-5.356v-24Zm14.728 0h16.306v4.883h-10.95v4.884h10.127v4.883H51.359v9.355h-5.356V.383ZM75.142 5.06h-6.935V.383h19.22V5.06h-6.934v19.323h-5.357V5.06h.006ZM91.014.383h4.257v.662h-1.72v3.999h-.817V1.045h-1.72V.383Zm9.681 4.66-.011-3.268-1.776 2.717h-.378l-1.787-2.661v3.213h-.784V.383h.671l2.103 3.19 2.058-3.19h.671l.011 4.66h-.783.005Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M.484.383h101v24h-101z" />
      </clipPath>
    </defs>
  </svg>
);
export default VText;
