import React, { ReactNode } from "react";
import "./styles.css";

interface SectionCardProps {
  title: string;
  rightText?: string;
  children?: ReactNode;
  gradient?: boolean;
  extraClass?: string;
  rightTextExtraClass?: string;
}

const SectionCard: React.FC<SectionCardProps> = ({
  title,
  rightText,
  children = "",
  gradient,
  extraClass = "",
  rightTextExtraClass = "",
}) => {
  const isGradient = gradient ? "oc-section-card-gradient" : "";
  return (
    <div className={`oc-section-card-wrapper`}>
      <div className="oc-section-card-header">
        <p className="oc-section-card-title">{title}</p>
        {rightText && <p className={`oc-estimated-shipping-date ${rightTextExtraClass}`}>{rightText}</p>}
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
