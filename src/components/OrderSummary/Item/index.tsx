import React from "react";
import "../styles.css";

interface ItemProps {
  name: React.ReactNode;
  price: string;
  type?: 'normal' | 'bold'
}

export const Item: React.FC<ItemProps> = ({ name, price, type = 'normal' }) => {
  return (
    <div className={`item-container`}>
      <span className={`item-price ${type}`}>{name}</span>
      <span className={`item-price ${type}`}>{price}</span>
    </div>
  );
};
