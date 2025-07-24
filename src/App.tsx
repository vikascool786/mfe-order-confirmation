import React from "react";
import "./App.css";
import OrderConfirmationContainerWrapper from "./config/mfe/OrderConfirmationContainerWrapper";

const App: React.FC = () => {
  return (
    <OrderConfirmationContainerWrapper
      orderId="7237144"
      shopperId="ZpXYpYwzzXVYUzhkZhzYpYmzYxpUmjmejWpqzjqzz"
      pcid="6565841"
      siteId={66}
      sessionId="3055555192"
    />
  );
};

export default App;
