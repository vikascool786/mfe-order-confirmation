import React from "react";
import "./styles.css";
import SocialShareButtons from "./Social";
import { IOrder } from "../../types";

interface ReferEarnProps {
  order: IOrder;
  contentStrings?: any;
}

export const ReferEarn: React.FC<ReferEarnProps> = ({
  order,
  contentStrings,
}: { order?: IOrder; contentStrings?: any }) => {
  // Flatten all items from invoices
  const items =
    order?.invoices?.flatMap((invoice) => invoice.items || []) || [];

  const hasHealth = items.some((item) => item.subscriptionOption === "CORE3");
  const hasBeauty = items.some((item) => item.subscriptionOption === "CORE3_B");

  // Dynamic logo image
  const logoSrc = "https://images.marketamerica.com/creative/2023/shop-pq4921-core3-health-campaign/usa/lp/c3-primary-logo-white-health.svg?v=1";

  // Dynamic description
  const description = hasHealth
    ? contentStrings?.response?.shareCore3WithFamily ||
    "Share Core 3 Health with your friends and family and earn $25-$30 CASH when they purchase it! Click any of the icons below to start sharing and earning."
    : hasBeauty
      ? contentStrings?.response?.shareCore3BWithFamily ||
      "Share Core 3 Beauty with your friends and family and earn $30 CASH when they purchase it! Click any of the icons below to start sharing and earning."
      : null;

  // Dynamic terms link
  const termsLink = hasBeauty
    ? "/core-3-beauty-referral-promotion-k.xhtml"
    : "/core-3-health-referral-promotion-k.xhtml";

  return (
    <div className="oc-re-container">
      <div className="oc-re-cash-people-container">
        <img
          className="oc-re-image-container"
          src="https://images.marketamerica.com/creative/2023/shop-pq4921-core3-health-campaign/usa/banners/share-and-earn-min.jpg"
          alt="Share and Earn Banner"
        />
      </div>

      <div className="oc-re-text-container">
        <div className="oc-re-text-box-container">
          <div className="oc-re-core-image">
            <img src={logoSrc} alt="Core 3 Logo" />
          </div>

          {description && <p className="oc-re-core-text">{description}</p>}

          <SocialShareButtons contentStrings={contentStrings} />
        </div>

        <a
          className="oc-re-social-core__terms-link"
          target="_blank"
          rel="noopener noreferrer"
          href={termsLink}
        >
          {contentStrings?.response?.termsAndConditionsApply ||
            "Terms & Conditions apply"}
        </a>
      </div>
    </div>
  );
};
