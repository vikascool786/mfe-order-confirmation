import React from "react";
import "./styles.css";
import { Item } from "./Item";
import Vift from "../../assets/svgs/Vift";
import { ProductSection } from "../../utils/getProductsPerStore";
import { Invoice, IOrder } from "../../types";

interface ILabel {
  subTotal: string;
  tax: string;
  shipping: string;
  cashback: string;
  orderTotal?: string;
}

interface SummaryProps {
  order: IOrder;
}

const OrderSummary: React.FC<SummaryProps> = ({ order }) => {
  const multipleShipments = order.invoices.length > 1;
  const totalString = multipleShipments ? "Total" : "Order Total";
  const totalStyle = multipleShipments ? 'mult' : 'single';
  const bordersForSummary = multipleShipments ? "top-border" : "";



  return (
    <div className="order-container">
      {order.invoices.map((invoice) => (
        <Item key={invoice.catalogID} multipleShipments={multipleShipments} currencySymbol={order.currencySymbol} invoice={invoice} bordersForSummary={bordersForSummary} />
      ))}

     {multipleShipments && <div className={`item-row pt ${bordersForSummary}`}>
        <span className={`item-price`}>Subtotal</span>
        <span className={`item-price`}>{order.currencySymbol}{order.grandTotal.toFixed(2)}</span>
      </div>}

      <div className="item-row item-price">
        <span className={`cashback`}>VIFT <span className="green">Cashback</span></span>
        <span className={`item-price`}>{order.currencySymbol}{order.cashbackTotal.toFixed(2)}</span>
      </div>

      <div className={`item-row-total ${bordersForSummary}`}>
        <span className={totalStyle}>{totalString}</span>
        <span className={`item-price`}>{order.currencySymbol}{order.orderTotal.toFixed(2)}</span>
      </div>

      <div className="cashback-container">
        <span className="cashback-text">
          <span className="vift-icon">
            <Vift />
          </span>
          <span>VIFT Cashback Earned in this order</span>
        </span>
        <span className="cashback-amount">${order.cashbackTotal.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
