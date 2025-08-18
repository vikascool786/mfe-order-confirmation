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
    <div className="oc-recom-product-card">
      <img src={baseUrl} alt={AltText} className="oc-recom-product-image" />
      <div className="oc-recom-product-info">
        <h4 className="oc-recom-product-title">{sanitize(title)}</h4>
        <p className="oc-recom-product-subtitle">{sanitize(department)}</p>
        <p className="oc-recom-product-description">{sanitize(description)}</p>
        <div className="oc-recom-product-footer">
          <span className="oc-recom-product-price">{currency}{price.toFixed(2)}</span>
          <span className="oc-recom-product-rating">
            {[...Array(5)].map((_, index) => {
              const filledPercent = Math.min(Math.max((parseFloat(rating) - index) * 100, 0), 100);
              return (
                <span key={index} className="oc-recom-star-wrapper">
                  <span
                    className="oc-recom-star-fill"
                    style={{
                      width: `${filledPercent}%`,
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