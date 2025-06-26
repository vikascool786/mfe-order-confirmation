import React from "react";
import "./styles.css";
import { Item } from "./Item";
import Vift from "../../assets/svgs/Vift";

interface SummaryProps {
  subtotal: string;
  tax: string;
  shipping: string;
  cashback: string;
  total: string;
}

const OrderData = [
  { label: "Subtotal", value: "$25.00" },
  { label: "Tax", value: "$2.02" },
  { label: "Shipping", value: "$6.00" },
  { label: "Cashback", value: "-$10.47", type: "bold" },
  { label: "Order Total", value: "$12.55", type: "bold" },
];

const OrderSummary: React.FC<SummaryProps> = ({
  subtotal,
  tax,
  shipping,
  cashback,
  total,
}) => {
  return (
    <div className="order-container">
      {OrderData.map((item) => (
        <Item name={item.label} price={item.value} type={item.type as any} />
      ))}
      <div className="cashback-container">
        <span className="cashback-text">
          <span className="vift-icon"><Vift /></span>
          <span>VIFT Cashback Earned in this order</span>
        </span>
        <span className="cashback-amount">$0.25</span>
      </div>
    </div>
  );
};

export default OrderSummary;
