import React from "react";
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

    // MA + MOR Product using Paypal
    <OrderConfirmationContainerWrapper
      orderId="7239595"
      shopperId="ZpXYpYwzzXVYUzhkZhzYpYmzYxpUmjmejWpqzjqzz"
      pcid="6565841"
      siteId={66}
      sessionId="3055555192"
            languagecode="ENG"
      sitetype="SHP"
      countrycode="USA"
      portalid="2245355.COM"
    />

    // MA Autoship Product using Card Payment
    // <OrderConfirmationContainerWrapper
    //   orderId="7239596"
    //   shopperId="ZpXYpYwzzXVYUzhkZhzYpYmzYxpUmjmejWpqzjqzz"
    //   pcid="6565841"
    //   siteId={66}
    //   sessionId="3055555192"
    // />

    // MA Autoship Product using Card Payment
    // <OrderConfirmationContainerWrapper
    //   orderId="3909222"
    //   shopperId="UmkepZWVzmqqVzhVqkzZmwqzWeXVYVWXWZZpzxhemz"
    //   pcid="2637612996"
    //   siteId={222}
    //   sessionId="3055555192"
    //   languagecode="ENG"
    //   sitetype="SHP"
    //   countrycode="USA"
    //   portalid="2245355.COM"
    // />

    // Back/Pre Order Product Splitted
    // <OrderConfirmationContainerWrapper
    //   orderId="3909707"
    //   shopperId="UmkepZWVzmqqVzhVqkzZmwqzWeXVYVWXWZZpzxhemz"
    //   pcid="2637612996"
    //   siteId={222}
    //   sessionId="3055555192"
    //   languagecode="ENG"
    //   sitetype="SHP"
    //   countrycode="USA"
    //   portalid="2245355.COM"
    // />
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
  );
};

export default App;
