import React from "react";
import { ProductSummaryItemProps } from "../types";

const ProductSummaryItem: React.FC<ProductSummaryItemProps> = ({
  subtotal,
  tax,
  shipping,
  cashback,
  total,
  image,
}) => {
  return (
    <div className="product-container">
      <img src={image} />
      <div className="product-price-container">
        <div className="product-content">
          <span className="product-name">Isotonix Calcium Plus</span>
          <span className="product-description-summary">Single Bottle (90 Servings)</span>
          <span className="product-cashback">+ $0.52 Cashback</span>
          <span className="product-quantity">Quantity: 1</span>
        </div>
        <div className="product-content-price">
          $25.00
        </div>
      </div>
    </div>
  );
};

export default ProductSummaryItem;
