import React from "react";
import "./styles.css";
import SocialShareButtons from "./Social";
export const ReferEarn = () => (
  <div className="refer-earn-container">
    <div className="cash-people-container">
      <img
        className="image-container"
        src="https://images.marketamerica.com/creative/2023/shop-pq4921-core3-health-campaign/usa/banners/share-and-earn-min.jpg"
      />
    </div>
    <div className="text-container">
      <div className="text-box-container">
        <div className="core-image">
          <img src="https://images.marketamerica.com/creative/2023/shop-pq4921-core3-health-campaign/usa/lp/c3-primary-logo-white-health.svg?v=1" />
        </div>
        <p className="core-text">
          Share Core 3 Health with your friends and family and EARN $25-$30 CASH
          when they purchase it!
        </p>
        <SocialShareButtons />
      </div>
      <a
        className="social-core__terms-link"
        target="_blank"
        href="/core-3-health-referral-promotion-k.xhtml"
      >
        Terms &amp; Conditions apply
      </a>
    </div>
  </div>
);
