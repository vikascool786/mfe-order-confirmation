import React from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import OrderConfirmationContainerWrapper from "./config/mfe/OrderConfirmationContainerWrapper";

const App: React.FC = () => {
  return (
    // MA Product
    // <OrderConfirmationContainerWrapper
    //   orderId="3909709"
    //   shopperId="UmkepZWVzmqqVzhVqkzZmwqzWeXVYVWXWZZpzxhemz"
    //   pcid="2637612996"
    //   siteId={222}
    //   sessionId="3055555192"
    //   languagecode="ENG"
    //   sitetype="SHP"
    //   countrycode="USA"
    //   portalid="2245355.COM"
    // />

    // MA Product - VIFT Wallet
    // <OrderConfirmationContainerWrapper
    //   orderId="3909710"
    //   shopperId="UmkepZWVzmqqVzhVqkzZmwqzWeXVYVWXWZZpzxhemz"
    //   pcid="2637612996"
    //   siteId={222}
    //   sessionId="3055555192"
    //   languagecode="ENG"
    //   sitetype="SHP"
    //   countrycode="USA"
    //   portalid="2245355.COM"
    // />

    // MA + MOR Product using Paypal - not working
    // <OrderConfirmationContainerWrapper
    //   orderId="7239595"
    //   shopperId="ZpXYpYwzzXVYUzhkZhzYpYmzYxpUmjmejWpqzjqzz"
    //   pcid="6565841"
    //   siteId={66}
    //   sessionId="3055555192"
    //   languagecode="ENG"
    //   sitetype="SHP"
    //   countrycode="USA"
    //   portalid="2245355.COM"
    // />

    // MA Autoship Product using Card Payment  - not working
    // <OrderConfirmationContainerWrapper
    //   orderId="7239596"
    //   shopperId="ZpXYpYwzzXVYUzhkZhzYpYmzYxpUmjmejWpqzjqzz"
    //   pcid="6565841"
    //   siteId={66}
    //   sessionId="3055555192"
    //   languagecode="ENG"
    //   sitetype="SHP"
    //   countrycode="USA"
    //   portalid="2245355.COM"
    // />

    // MA Autoship Product using Card Payment
    // <OrderConfirmationContainerWrapper
    //   orderId="3909882"
    //   shopperId=""
    //   pcid=""
    //   siteId={222}
    //   sessionId="3055555192"
    //   languagecode="ENG"
    //   sitetype="SHP"
    //   countrycode="USA"
    //   portalid="2245355.COM"
    // />
    // <OrderConfirmationContainerWrapper
    //   orderId="3909927"
    //   shopperId=""
    //   pcid=""
    //   siteId={222}
    //   email="testaug21a@yopmail.com"
    //   sessionId="3006857171"
    //   languagecode="ENG"
    //   sitetype="SHP"
    //   countrycode="USA"
    //   portalid="2245355.COM"
    //   optInStatus="n"
    // />

    // Back/Pre Order Product Splitted
    <OrderConfirmationContainerWrapper
      orderId="3909921"
      shopperId="UmkepZWVzmqqVzhVqkzZmwqzWeXVYVWXWZZpzxhemz"
      countrycode="USA"
      languagecode="ENG"
      sitetype="SHP"
      pcid="2637612996"
      siteId={222}
      sessionId="3006856717"
      portalid="2245355.COM"
      optInStatus="y"
      email=""
    />
    // Back/Pre Order Product Shipping Now
    // <OrderConfirmationContainerWrapper
    //   orderId="3909708"
    //   shopperId="UmkepZWVzmqqVzhVqkzZmwqzWeXVYVWXWZZpzxhemz"
    //   pcid="2637612996"
    //   siteId={222}
    //   sessionId="3055555192"
    //   languagecode="ENG"
    //   sitetype="SHP"
    //   countrycode="USA"
    //   portalid="2245355.COM"
    // />
    // MA + MOR Product
    // <OrderConfirmationContainerWrapper
    //   orderId="3909739"
    //   shopperId="UmkepZWVzmqqVzhVqkzZmwqzWeXVYVWXWZZpzxhemz"
    //   pcid="2637612996"
    //   siteId={222}
    //   sessionId="3006839890"
    //   languagecode="ENG"
    //   sitetype="SHP"
    //   countrycode="USA"
    //   portalid="2245355.COM"
    // />
    // Coral 3 Health Product
    // <OrderConfirmationContainerWrapper
    //   orderId="3909739"
    //   shopperId="UmkepZWVzmqqVzhVqkzZmwqzWeXVYVWXWZZpzxhemz"
    //   pcid="2637612996"
    //   siteId={222}
    //   sessionId="3006840152"
    //   languagecode="ENG"
    //   sitetype="SHP"
    //   countrycode="USA"
    //   portalid="2245355.COM"
    // />
  );
};

export default App;
createRoot(document.getElementById("app")!).render(<App />);
