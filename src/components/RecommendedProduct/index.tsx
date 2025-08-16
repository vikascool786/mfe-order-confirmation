import React from "react";
import sanitize from 'sanitize-html'
import { IRecommendedProduct } from "./types";
import Star from "../../assets/svgs/Star";
import {
  RecommendedProductCard,
  ProductImage,
  ProductInfo,
  ProductTitle,
  ProductSubtitle,
  ProductDescription,
  ProductFooter,
  ProductPrice,
  ProductRating,
} from "./styles";

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
    <RecommendedProductCard>
      <ProductImage src={baseUrl} alt={AltText} />
      <ProductInfo>
        <ProductTitle>{sanitize(title)}</ProductTitle>
        <ProductSubtitle>{sanitize(department)}</ProductSubtitle>
        <ProductDescription>{sanitize(description)}</ProductDescription>
        <ProductFooter>
          <ProductPrice>{currency}{price.toFixed(2)}</ProductPrice>
          <ProductRating>
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
          </ProductRating>
        </ProductFooter>
      </ProductInfo>
    </RecommendedProductCard>
  );
};

export default RecommendedProduct;