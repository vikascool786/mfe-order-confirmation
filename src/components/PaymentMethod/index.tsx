import React from "react";
import "./styles.css";

interface PaymentMethodProps {
  methods: Set<string>;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ methods }) => {
  return (
    <div className="payment-container">
      <span>Payment Method</span>
      <div className="payment-text">
       {Array.from(methods).map(method => <span>{method}</span>) }
      </div>
    </div>
  );
};

export default PaymentMethod;
