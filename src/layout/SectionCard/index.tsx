import React, { ReactNode } from "react";
import "./styles.css";

interface SectionCardProps {
  title: string;
  rightText?: string;
  children?: ReactNode;
  gradient?: boolean;
  extraClass?: string;
  borderTop?: boolean
  rightTextExtraClass?: string;
}

const SectionCard: React.FC<SectionCardProps> = ({
  title,
  rightText,
  children = "",
  gradient,
  extraClass = "",
  borderTop,
  rightTextExtraClass = "",
}) => {
  const isGradient = gradient ? "oc-section-card-gradient" : "";
  const isBorder = borderTop ? 'oc-border-top' : ""
  return (
    <div className={`oc-section-card-wrapper`}>
      <div className={`oc-section-card-header ${isBorder}`}>
        <div className="oc-section-card-title">{title}</div>
        {rightText && <div className={`oc-estimated-shipping-date ${rightTextExtraClass}`}>{rightText}</div>}
      </div>
      {children && (
        <section className={`oc-section-card-body ${extraClass} ${isGradient}`}>
          {children}
        </section>
      )}
    </div>
  );
};

export default SectionCard;
