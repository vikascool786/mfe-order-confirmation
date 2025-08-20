import React from "react";
import "./styles.css";

interface OrderHeaderProps {
  orderId: string;
  name: string;
  deliveryDate?: string;
  email: string;
  contentStrings?: any;
}

const OrderHeader: React.FC<OrderHeaderProps> = ({
  orderId,
  name,
  deliveryDate,
  email,
  contentStrings,
}) => {
  return (
    <div className="oc-order-header-container">
      <span className="oc-order-id">{contentStrings?.response?.["order-pound"]}{orderId}</span>
      <span className="oc-order-heading">{name}, {contentStrings?.response?.["orders-thankYouForShoppingWithUs"]}</span>
      {deliveryDate && <span className="oc-order-estimated-delivery">
        {contentStrings?.response?.estimatedDeliveryDate} {deliveryDate}
      </span>}
      <span className="oc-order-confirmation">
        {contentStrings?.response?.confirmationEmailSentTo} {email}
      </span>
      <span className="oc-order-confirmation-print" onClick={() => window.print()}>{contentStrings?.response?.printOrderConfirmation}</span>
    </div>
  );
};

export default OrderHeader;
