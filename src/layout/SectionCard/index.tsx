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
  const isGradient = gradient ? "section-card-gradient" : "";
  return (
    <div className={`section-card-wrapper`}>
      <div className="section-card-header">
        <p className="section-card-title">{title}</p>
        {rightText && <p className={`estimated-shipping-date ${rightTextExtraClass}`}>{rightText}</p>}
      </div>
      {children && (
        <section className={`section-card-body ${extraClass} ${isGradient}`}>
          {children}
        </section>
      )}
    </div>
  );
};

export default SectionCard;
