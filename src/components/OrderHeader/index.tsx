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
    <div className="qa-order-header oc-order-header-container">
      <span className="qa-order-id oc-order-id">
        {contentStrings?.response?.["order-pound"]}
        {orderId}
      </span>
      <span className="qa-order-heading oc-order-heading">
        {name}, {contentStrings?.response?.["orders-thankYouForShoppingWithUs"]}
      </span>
      {deliveryDate && (
        <span className="qa-order-delivery-date oc-order-estimated-delivery">
          {contentStrings?.response?.estimatedDeliveryDate} {deliveryDate}
        </span>
      )}
      <span className="qa-order-confirmation-email oc-order-confirmation">
        {contentStrings?.response?.confirmationEmailSentTo}
        <a href={`mailto:${email}`}>{email}</a>
      </span>
      <span
        className="qa-order-confirmation-print oc-order-confirmation-print"
        onClick={() => window.print()}
      >
        {contentStrings?.response?.printOrderConfirmation}
      </span>
    </div>
  );
};

export default OrderHeader;
