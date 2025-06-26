import React from "react";
import "./styles.css";

interface OrderUpdatesProps {
  updates: string[];
}

export const OrderUpdates: React.FC<OrderUpdatesProps> = ({ updates }) => {
  return (
    <div className="order-updates-container">
      <label className="order-updates-label">
        <input type="checkbox" />
      </label>
      <span className="order-updates-text">
        Want to receive text messages on this order?
        <p className="disclaimer">Message and data rates may apply.</p>
      </span>
    </div>
  );
};
