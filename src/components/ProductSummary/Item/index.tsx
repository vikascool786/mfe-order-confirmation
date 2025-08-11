import React from "react";
import sanitize from 'sanitize-html';
import { ProductSummaryItemProps } from "../types";
import Vift from "../../../assets/svgs/Vift";

const ProductSummaryItem: React.FC<ProductSummaryItemProps> = ({
  product,
  image,
}) => {
  return (
    <div className="product-container">
      <img src={image} />
      <div className="product-price-container">
        <div className="product-content">
          <span className="product-name">{sanitize(product.description)}</span>
          <span className="product-description-summary">
            {product?.options?.map((option, index) => option)}
          </span>
          <span className="product-cashback">
            <span className="cashback-amount">
            + {product.cashback}
            </span>
            <span className="cashback-icon-text">
              <Vift /> Cashback
            </span>
          </span>
          <span className="product-quantity">Quantity: {product.quantity}</span>
        </div>
        <div className="product-content-price">${product.price.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default ProductSummaryItem;
