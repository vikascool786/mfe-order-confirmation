import React from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import OrderConfirmationContainerWrapper from "./config/mfe/OrderConfirmationContainerWrapper";

interface AppProps { }

const App: React.FC<AppProps> = () => {
  return (
    <OrderConfirmationContainerWrapper
      orderId="3909739"
      shopperId="UmkepZWVzmqqVzhVqkzZmwqzWeXVYVWXWZZpzxhemz"
      pcid="2637612996"
      siteId={222}
      sessionId="3006840152"
      languagecode="ENG"
      sitetype="SHP"
      countrycode="USA"
      portalid="2245355.COM"
    />
  );
};

export default App;
createRoot(document.getElementById("app")!).render(<App />);