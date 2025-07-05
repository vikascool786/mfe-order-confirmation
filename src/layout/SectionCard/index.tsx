import React, { ReactNode } from "react";
import "./styles.css";

interface SectionCardProps {
  title: string;
  rightText?: string;
  children?: ReactNode;
  gradient?: boolean;
  extraClass?: string;
}

const SectionCard: React.FC<SectionCardProps> = ({
  title,
  rightText,
  children = "",
  gradient,
  extraClass = "",
}) => {
  const isGradient = gradient ? "section-card-gradient" : "";
  return (
    <div className={`section-card-wrapper`}>
      <div className="section-card-header">
        <p className="section-card-title">{title}</p>
        {rightText && <span>{rightText}</span>}
      </div>
      {children && (
        <section className={`section-card-body ${isGradient} ${extraClass}`}>
          {children}
        </section>
      )}
    </div>
  );
};

export default SectionCard;
