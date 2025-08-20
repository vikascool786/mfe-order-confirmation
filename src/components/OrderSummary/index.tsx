import React from "react";
import Vift from "../../assets/svgs/Vift";
import { IOrder } from "../../types";
import { Item } from "./Item";
import "./styles.css";

interface SummaryProps {
  order: IOrder;
  contentStrings?: any;
}

const OrderSummary: React.FC<SummaryProps> = ({ order, contentStrings }) => {
  const multipleShipments = order.invoices.length > 1;
  const totalString = multipleShipments ? (contentStrings?.response?.total || "Total") : (contentStrings?.response?.orderTotal || "Order Total");
  const totalStyle = multipleShipments ? 'oc-summary-multiple' : 'oc-summary-single';
  const bordersForSummary = multipleShipments ? "oc-summary-top-border" : "";



  return (
    <div className="oc-summary-order-container">
      {order.invoices.map((invoice, index) => (
        <Item key={invoice.catalogID} index={index} multipleShipments={multipleShipments} currencySymbol={order.currencySymbol} invoice={invoice} bordersForSummary={bordersForSummary} />
      ))}

     {multipleShipments && <div className={`oc-summary-item-row oc-summary-pt ${bordersForSummary}`}>
        <span className={`oc-summary-item-price`}>{contentStrings?.response?.subTotal || "Subtotal"}</span>
        <span className={`oc-summary-item-price`}>{order.currencySymbol}{order.grandTotal.toFixed(2)}</span>
      </div>}

      <div className="oc-summary-item-row oc-summary-item-price">
        <span className={`oc-summary-cashback`}>{contentStrings?.response?.vift || "VIFT"} <span className="oc-summary-green">{contentStrings?.response?.cashBack || "Cashback"}</span></span>
        <span className={`oc-summary-cashback oc-summary-green`}>{order.currencySymbol}{order.cashbackTotal.toFixed(2)}</span>
      </div>

      <div className={`oc-summary-item-row-total ${bordersForSummary}`}>
        <span className={totalStyle}>{totalString}</span>
        <span className={`oc-summary-item-price ${totalStyle}`}>{order.currencySymbol}{order.orderTotal.toFixed(2)}</span>
      </div>

      <div className="oc-summary-cashback-container">
        <span className="oc-summary-cashback-text">
          <span className="oc-summary-vift-icon">
            <Vift />
          </span>
          <span>{contentStrings?.response?.viftCashbackEarned || "VIFT Cashback Earned in this order"}</span>
        </span>
        <span className="oc-summary-cashback-amount">${order.cashbackTotal.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
