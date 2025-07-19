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
    <div className="order-header-container">
      <span className="order-id">Order #{orderId}</span>
      <span className="order-heading">{name}, thank you for shopping with us!</span>
      {deliveryDate && <span className="order-estimated-delivery">
        Estimated Delivery Date {deliveryDate}
      </span>}
      <span className="order-confirmation">
        We sent a confirmation email to {email}
      </span>
      <span className="order-confirmation-print" onClick={() => window.print()}>Print Order Confirmation</span>
    </div>
  );
};

export default OrderHeader;
