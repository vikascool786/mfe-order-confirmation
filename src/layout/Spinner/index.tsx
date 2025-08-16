import React from "react";
import "./styles.css";

export const Spinner = () => (
  <div className="oc-spinner-wrapper">
    <svg className="oc-spinner" viewBox="0 0 50 50">
      <defs>
        <linearGradient
          id="oc-spinner-gradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stop-color="rgba(65, 153, 228, 1)" />
          <stop offset="100%" stop-color="rgba(42, 80, 112, 1)" />
        </linearGradient>
      </defs>
      <circle
        className="oc-spinner-path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke="url(#oc-spinner-gradient)"
      />
    </svg>
  </div>
);
