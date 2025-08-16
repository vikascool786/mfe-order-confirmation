import React from "react";
import "./styles.css";

interface OrderHeaderProps {
  orderId: string;
  name: string;
  deliveryDate?: string;
  email: string;
}

const OrderHeader: React.FC<OrderHeaderProps> = ({
  orderId,
  name,
  deliveryDate,
  email,
}) => {
  return (
    <div className="oc-order-header-container">
      <span className="oc-order-id">Order #{orderId}</span>
      <span className="oc-order-heading">{name}, thank you for shopping with us!</span>
      {deliveryDate && <span className="oc-order-estimated-delivery">
        Estimated Delivery Date {deliveryDate}
      </span>}
      <span className="oc-order-confirmation">
        We sent a confirmation email to {email}
      </span>
      <span className="oc-order-confirmation-print" onClick={() => window.print()}>Print Order Confirmation</span>
    </div>
  );
};

export default OrderHeader;
