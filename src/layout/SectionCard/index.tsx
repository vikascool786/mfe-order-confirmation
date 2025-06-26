import React, { ReactNode } from "react";
import "./styles.css";

interface SectionCardProps {
  title: string;
  rightText?: string;
  children: ReactNode;
  gradient?: boolean;
}

const SectionCard: React.FC<SectionCardProps> = ({
  title,
  rightText,
  children,
  gradient,
}) => {
  const isGradient = gradient ? "section-card-gradient" : "";
  return (
    <div className={`section-card-wrapper`}>
      <div className="section-card-header">
        <h2 className="section-card-header">{title}</h2>
        {rightText && <span>{rightText}</span>}
      </div>
      <section className={`section-card-body  ${isGradient}`}>{children}</section>
    </div>
  );
};

export default SectionCard;
