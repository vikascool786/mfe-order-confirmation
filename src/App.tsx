import React from "react";
import "./App.css";
import OrderConfirmationContainerWrapper from "./config/mfe/OrderConfirmationContainerWrapper";

const App: React.FC = () => {
  return (
    <OrderConfirmationContainerWrapper
      orderId="7235116"
      shopperId="ZpXYpYwzzXVYUzhkZhzYpYmzYxpUmjmejWpqzjqzz"
      pcid="1871572383"
      siteId={66}
      sessionId="3055480047"
    />
  );
};

export default App;
