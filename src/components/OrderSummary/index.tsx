import React from "react";
import Vift from "../../assets/svgs/Vift";
import { IOrder } from "../../types";
import { Item } from "./Item";
import "./styles.css";

interface SummaryProps {
  order: IOrder;
}

const OrderSummary: React.FC<SummaryProps> = ({ order }) => {
  const multipleShipments = order.invoices.length > 1;
  const totalString = multipleShipments ? "Total" : "Order Total";
  const totalStyle = multipleShipments ? 'oc-summary-multiple' : 'oc-summary-single';
  const bordersForSummary = multipleShipments ? "oc-summary-top-border" : "";



  return (
    <div className="oc-summary-order-container">
      {order.invoices.map((invoice) => (
        <Item key={invoice.catalogID} multipleShipments={multipleShipments} currencySymbol={order.currencySymbol} invoice={invoice} bordersForSummary={bordersForSummary} />
      ))}

     {multipleShipments && <div className={`oc-summary-item-row oc-summary-pt ${bordersForSummary}`}>
        <span className={`oc-summary-item-price`}>Subtotal</span>
        <span className={`oc-summary-item-price`}>{order.currencySymbol}{order.grandTotal.toFixed(2)}</span>
      </div>}

      <div className="oc-summary-item-row oc-summary-item-price">
        <span className={`oc-summary-cashback`}>VIFT <span className="oc-summary-green">Cashback</span></span>
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
          <span>VIFT Cashback Earned in this order</span>
        </span>
        <span className="oc-summary-cashback-amount">${order.cashbackTotal.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
