

import React from "react";
import "./styles.css";

interface RecommendedProductProps {
  image: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  rating?: number;
}

const RecommendedProduct: React.FC<RecommendedProductProps> = ({
  image,
  title,
  subtitle,
  description,
  price,
  rating = 5,
}) => {
  return (
    <div className="recommended-product-card">
      <img src={image} alt={title} className="product-image" />
      <div className="product-info">
        <h4 className="product-title">{title}</h4>
        <p className="product-subtitle">{subtitle}</p>
        <p className="product-description">{description}</p>
        <div className="product-footer">
          <span className="product-price">{price}</span>
          <span className="product-rating">{"⭐".repeat(rating)}</span>
        </div>
      </div>
    </div>
  );
};

export default RecommendedProduct;