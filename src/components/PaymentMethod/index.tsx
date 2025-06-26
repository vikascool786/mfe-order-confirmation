import React from "react";
import "./styles.css";

interface PaymentMethodProps {
  method: string;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ method }) => {
  return (
    <div className="payment-container">
      <span>Payment Method</span>
      <div className="payment-text">
        <span>Mastercard 0469</span>
      </div>
    </div>
  );
};

export default PaymentMethod;
