import React from "react";
import "./styles.css";

interface RoundedButtonProps {
  text: string;
  onClick?: () => void;
}

const RoundedButton: React.FC<RoundedButtonProps> = ({ text, onClick }) => {
  return (
    <button className="rounded-button" onClick={onClick}>
      {text}
    </button>
  );
};

export default RoundedButton;
