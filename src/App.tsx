import React from "react";
import "./App.css";
import OrderConfirmationContainerWrapper from "./config/mfe/OrderConfirmationContainerWrapper";

const App: React.FC = () => {
  return (
    // MA Product using VIFT Cashback
    // <OrderConfirmationContainerWrapper
    //   orderId="7239594"
    //   shopperId="ZpXYpYwzzXVYUzhkZhzYpYmzYxpUmjmejWpqzjqzz"
    //   pcid="6565841"
    //   siteId={66}
    //   sessionId="3055555192"
    // />

    // MA + MOR Product using Paypal
    // <OrderConfirmationContainerWrapper
    //   orderId="7239595"
    //   shopperId="ZpXYpYwzzXVYUzhkZhzYpYmzYxpUmjmejWpqzjqzz"
    //   pcid="6565841"
    //   siteId={66}
    //   sessionId="3055555192"
    // />

    // MA Autoship Product using Card Payment
    // <OrderConfirmationContainerWrapper
    //   orderId="7239596"
    //   shopperId="ZpXYpYwzzXVYUzhkZhzYpYmzYxpUmjmejWpqzjqzz"
    //   pcid="6565841"
    //   siteId={66}
    //   sessionId="3055555192"
    // />

        // MA Autoship Product using Card Payment
    <OrderConfirmationContainerWrapper
      orderId="7239596"
      shopperId="ZpXYpYwzzXVYUzhkZhzYpYmzYxpUmjmejWpqzjqzz"
      pcid="6565841"
      siteId={66}
      sessionId="3055555192"
    />
  );
};

export default App;
