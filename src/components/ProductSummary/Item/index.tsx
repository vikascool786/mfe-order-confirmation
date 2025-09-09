import React, { useEffect, useState } from "react";
import sanitize from "sanitize-html";
import { ProductSummaryItemProps } from "../types";
import Vift from "../../../assets/svgs/Vift";
import "../styles.css";
import { getSpecialInstructionMessage } from "../../../utils/getSpecialInstructionMessage";

interface ExtendedProductSummaryItemProps extends ProductSummaryItemProps {
  contentStrings?: any;
}

const ProductSummaryItem: React.FC<ExtendedProductSummaryItemProps> = ({
  product,
  image,
  contentStrings,
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleResize = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };

    // Set initial value
    handleResize(mediaQuery);

    // Add listener
    mediaQuery.addEventListener("change", handleResize);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);
  return (
    <div className="qa-product-summary oc-ps-container">
      <img src={image} className="qa-image" />
      <div className="oc-ps-price-container">
        <div
          className="oc-ps-content"
          onClick={() => (window.location.href = product.productURL)}
        >
          <span className="qa-item-name oc-ps-name">
            {sanitize(product.description)}
          </span>
          <span className="oc-ps-description-summary">
            {product?.specialInstructionList?.map((instruction, index) => (
              <span key={index}>
                {`${getSpecialInstructionMessage(
                  instruction.specialInstructionTypeID
                )}
                ${instruction.specialInstruction}`}
              </span>
            ))}
          </span>
          <span className="oc-ps-cashback">
            <span className="oc-ps-cashback-amount">+ {product.cashback}</span>
            <span className="qa-cashback oc-ps-cashback-icon-text">
              <Vift /> {contentStrings?.response?.cashBack || "Cashback"}
            </span>
          </span>
          <span className="qa-item-quantity oc-ps-quantity">
            {contentStrings?.response?.quantity || "Quantity"}:{" "}
            {product.quantity}
          </span>
          {isMobile && (
            <div className="qa-item-price oc-ps-content-price">
              ${product.extendedPrice.toFixed(2)}
            </div>
          )}
        </div>

        {!isMobile && (
          <div className="qa-item-price oc-ps-content-price">
            ${product.extendedPrice.toFixed(2)}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSummaryItem;
