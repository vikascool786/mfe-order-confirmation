import * as React from "react";
import { SVGProps } from "react";
const Vift = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={19}
    height={19}
    fill="none"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        fill="#09A79D"
        d="M9.281 18.673a8.7 8.7 0 1 0 0-17.4 8.7 8.7 0 0 0 0 17.4Z"
      />
      <path
        fill="#fff"
        d="M13.667 11.527c0-2.028-1.878-2.4-3.642-2.634V6.577a1.572 1.572 0 0 1 1.332 1.284h1.986c-.186-2.028-1.938-2.61-3.342-2.772V3.523H8.537V5.04c-1.938.132-3.456.918-3.456 2.754 0 1.836 1.74 2.316 3.48 2.538v2.64a1.734 1.734 0 0 1-1.62-1.65H4.895c0 1.686 1.08 2.88 3.642 3.09v1.89h1.488v-1.908c1.752-.132 3.642-.822 3.642-2.868Zm-6.6-3.888c0-.696.6-1.074 1.482-1.158v2.214c-.882-.15-1.506-.402-1.506-1.056h.024Zm3 5.352v-2.418c.936.174 1.62.462 1.62 1.158s-.768 1.14-1.662 1.242l.042.018Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M.281.973h18v18h-18z" />
      </clipPath>
    </defs>
  </svg>
);
export default Vift;
