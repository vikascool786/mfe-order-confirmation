import React from "react";
import ProductSummaryItem from "./Item";
import "./styles.css";
import { ProductSummaryProps } from "./types";

const ProductSummary: React.FC<ProductSummaryProps> = ({ invoices }) => {
  return (
    <>
      {invoices.map((product, index) => (
        product.items.map((item, itemIndex) => (
          <ProductSummaryItem
            key={`${index}-${itemIndex}`}
            image={item.productImage}
            subtotal={product.subTotal.toFixed(2)}
            tax={product.salesTaxRate.toFixed(2)}
            shipping={product.shippingCharge.toFixed(2)}
            cashback={product.cashbackEarned.toFixed(2)}
            total={product.total.toFixed(2)}
            product={item}
          />
        ))
      ))}
    </>
  );
};

export default ProductSummary;
