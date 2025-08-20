import React from "react";
import { createRoot } from "react-dom/client";
import OrderConfirmationContainerWrapper from "./OrderConfirmationContainerWrapper";

// Registers component as a custom element
class OrderConfirmationContainerElement extends HTMLElement {
  constructor() {
    super();
    this.root = null;
    this.mountPoint = null;
  }

  connectedCallback() {
    this.mountPoint = document.createElement("div");
    this.appendChild(this.mountPoint);

    const props = {
      shopperId: this.getAttribute("shopperid") || "",
      orderId: this.getAttribute("orderid") || "",
      pcid: this.getAttribute("pcid") || "",
      siteId: this.getAttribute("siteid") || "",
      email: this.getAttribute("email") || "",
      sessionId: this.getAttribute("sessionid") || "",
      languagecode: this.getAttribute("languagecode") || "",
      sitetype: this.getAttribute("sitetype") || "",
      countrycode: this.getAttribute("countrycode") || "",
      portalid: this.getAttribute("portalid") || "",
      optInStatus: this.getAttribute("optinstatus") || "",
    };

    this.root = createRoot(this.mountPoint);
    this.root.render(
      React.createElement(OrderConfirmationContainerWrapper, props)
    );
  }

  disconnectedCallback() {
    if (this.root) {
      this.root.unmount();
    }
  }
}

export default OrderConfirmationContainerElement;
