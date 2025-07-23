import React from "react";
import "../styles.css";
import { Invoice } from "../../../types";
import { getOrderSummaryBreakdown } from "../../../utils/getOrderSummaryBreakdown";

interface SummaryItemProps {
  invoice: Invoice;
  currencySymbol: string;
  multipleShipments: boolean;
  bordersForSummary: string;
}

export const Item: React.FC<SummaryItemProps> = ({ invoice, currencySymbol, multipleShipments, bordersForSummary }) => {
  const summaryItems = getOrderSummaryBreakdown(invoice);
  return (
    <div className={`item-container ${bordersForSummary}`}>
      {multipleShipments&& <p className="item-header">{invoice.storeName} Shipment</p>}
      {Object.entries(summaryItems).map((item) => (
        <div className="item-row">
          <span className={`item-price`}>{item[0]}</span>
          <span className={`item-price`}>{currencySymbol}{item[1].toFixed(2)}</span>
        </div>
      ))}
    </div>
  );
};
