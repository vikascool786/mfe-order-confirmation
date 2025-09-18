import React from "react";
import ProductSummaryItem from "./Item";
import "./styles.css";
import { ProductSummaryProps } from "./types";

const ProductSummary: React.FC<ProductSummaryProps> = ({ invoice, shopperPortalData, shopperAttributes }) => {
  return (
    <>
      {invoice.items.map((product, index) => (
          <ProductSummaryItem
            key={`${index}-${index}`}
            image={product.productImage}
            subtotal={invoice.subTotal.toFixed(2)}
            tax={invoice.salesTaxRate.toFixed(2)}
            shipping={invoice.shippingCharge.toFixed(2)}
            cashback={invoice.cashbackEarned.toFixed(2)}
            total={invoice.subTotal.toFixed(2)} 
            product={product}
            shopperPortalData={shopperPortalData}
            shopperAttributes={shopperAttributes}
          />
      ))}
    </>
  );
};
export default ProductSummary;