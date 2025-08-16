import React from "react";
import "./styles.css";
import SocialShareButtons from "./Social";
export const ReferEarn = () => (
  <div className="oc-re-container">
    <div className="oc-re-cash-people-container">
      <img
        className="oc-re-image-container"
        src="https://images.marketamerica.com/creative/2023/shop-pq4921-core3-health-campaign/usa/banners/share-and-earn-min.jpg"
      />
    </div>
    <div className="oc-re-text-container">
      <div className="oc-re-text-box-container">
        <div className="oc-re-core-image">
          <img src="https://images.marketamerica.com/creative/2023/shop-pq4921-core3-health-campaign/usa/lp/c3-primary-logo-white-health.svg?v=1" />
        </div>
        <p className="oc-re-core-text">
          Share Core 3 Health with your friends and family and EARN $25-$30 CASH
          when they purchase it!
        </p>
        <SocialShareButtons />
      </div>
      <a
        className="oc-re-social-core__terms-link"
        target="_blank"
        href="/core-3-health-referral-promotion-k.xhtml"
      >
        Terms &amp; Conditions apply
      </a>
    </div>
  </div>
);
