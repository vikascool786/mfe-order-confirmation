import React, { ReactNode } from "react";
import "./styles.css";
interface ContainerProps {
  left: ReactNode;
  right: ReactNode;
}

const Container = ({ left, right }: ContainerProps) => {
  return (
    <div className="oc-layout-grid">
      <div className="oc-left-column">{left}</div>
      <div className="oc-right-column">{right}</div>
    </div>
  );
};

export default Container;
