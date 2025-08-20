import React from "react";
import "./styles.css";

interface PaymentMethodProps {
  methods: Set<string>;
  contentStrings?: any;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ methods, contentStrings }) => {
  return (
    <div className="oc-payment-container">
      <span>{contentStrings?.response?.paymentMethod || "Payment Method"}</span>
      <div className="oc-payment-text">
       {Array.from(methods).map(method => <span>{method}</span>) }
      </div>
    </div>
  );
};

export default PaymentMethod;
