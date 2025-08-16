import React from "react";
import "./styles.css";
import sanitize from 'sanitize-html'
import { IRecommendedProduct } from "./types";
import Star from "../../assets/svgs/Star";

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
          <span className="product-rating">
            {[...Array(5)].map((_, index) => {
              const filledPercent = Math.min(Math.max((parseFloat(rating) - index) * 100, 0), 100);
              return (
                <span key={index} className="star-wrapper">
                  <Star />
                  <span
                    className="star-fill"
                    style={{
                      width: `${filledPercent}%`,
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      height: '100%',
                      overflow: 'hidden',
                      pointerEvents: 'none'
                    }}
                  >
                    <Star />
                  </span>
                </span>
              );
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecommendedProduct;