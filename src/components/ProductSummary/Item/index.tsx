import React, { useEffect, useState } from "react";
import sanitize from "sanitize-html";
import { ProductSummaryItemProps } from "../types";
import Vift from "../../../assets/svgs/Vift";
import "../styles.css";
import { getSpecialInstructionMessage } from "../../../utils/getSpecialInstructionMessage";

const ProductSummaryItem: React.FC<ProductSummaryItemProps> = ({
  product,
  image,
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
    <div className="oc-ps-container">
      <img src={image} />
      <div className="oc-ps-price-container">
        <div
          className="oc-ps-content"
          onClick={() => (window.location.href = product.productURL)}
        >
          <span className="oc-ps-name">{sanitize(product.description)}</span>
          <span className="oc-ps-description-summary">
            {product?.specialInstructionList?.map((instruction) => (
              <span>
                {`${getSpecialInstructionMessage(
                  instruction.specialInstructionTypeID
                )}
                ${instruction.specialInstruction}`}
              </span>
            ))}
          </span>
          <span className="oc-ps-cashback">
            <span className="oc-ps-cashback-amount">+ {product.cashback}</span>
            <span className="oc-ps-cashback-icon-text">
              <Vift /> Cashback
            </span>
          </span>
          <span className="oc-ps-quantity">Quantity: {product.quantity}</span>
          {isMobile && (
            <div className="oc-ps-content-price">
              ${product.price.toFixed(2)}
            </div>
          )}
        </div>
        {!isMobile && (
          <div className="oc-ps-content-price">${product.price.toFixed(2)}</div>
        )}
      </div>
    </div>
  );
};

export default ProductSummaryItem;
