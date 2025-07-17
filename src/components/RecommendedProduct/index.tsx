

import React from "react";
import "./styles.css";
import sanitize from 'sanitize-html'
import { IRecommendedProduct } from "./types";

interface RecommendedProductProps {
  product: IRecommendedProduct;
  currency: string;
}

const RecommendedProduct: React.FC<RecommendedProductProps> = ({
  product,
  currency
}) => {
  const {baseUrl, AltText, title, description, price, rating, department} = product;
  return (
    <div className="recommended-product-card">
      <img src={baseUrl} alt={AltText} className="product-image" />
      <div className="product-info">
        <h4 className="product-title">{sanitize(title)}</h4>
        <p className="product-subtitle">{sanitize(department)}</p>
        <p className="product-description">{sanitize(description)}</p>
        <div className="product-footer">
          <span className="product-price">{currency}{price.toFixed(2)}</span>
          <span className="product-rating">{"⭐".repeat(parseInt(rating))}</span>
        </div>
      </div>
    </div>
  );
};

export default RecommendedProduct;