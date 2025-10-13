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
    //   orderId="7259392"
    //   shopperId="ZpXYpYwzzXVYUzhkZhzYpYmzYxpUmjmejWpqzjqzz"
    //   pcid="6565841"
    //   siteId={66}
    //   email="testsep2678@yopmail.com"
    //   sessionId="3055657678"
    //   languagecode="ENG"
    //   sitetype="SHP"
    //   countrycode="USA"
    //   portalid="7052764.COM"
    //   optInStatus="n"
    // />

    // Back/Pre Order Product Splitted
    // <OrderConfirmationContainerWrapper
    //   orderId="7249872"
    //   shopperId="hmUhkqpzzezhXzhhVqzZmxWzqeYXkUjzqXjpzpqqm"
    //   countrycode="USA"
    //   languagecode="ENG"
    //   sitetype="SHP"
    //   pcid="1947765337"
    //   siteId={66}
    //   sessionId="3055611913"
    //   portalid="AZXCXLL3SE3WS3DDTOO8I9.COM"
    //   optInStatus="y"
    //   email=""
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
     <OrderConfirmationContainerWrapper
      orderId="7249899"
      shopperId="hmUhkqpzzezhXzhhVqzZmxWzqeYXkUjzqXjpzpqqm"
      countrycode="USA"
      languagecode="ENG"
      sitetype="SHP"
      pcid="1947765337"
      siteId={66}
      sessionId="3055612713"
      portalid="AZXCXLL3SE3WS3DDTOO8I9.COM"
      optInStatus="y"
      email=""
    />
    
    // single vift payment
    // <OrderConfirmationContainerWrapper
    //   orderId="7252090"
    //   shopperId="wjZzYhzpzejjezhqxqzqwmVzxYqVzqmqhXjYzxhkh"
    //   countrycode="USA"
    //   languagecode="ENG"
    //   sitetype="SHP"
    //   pcid="1310279719"
    //   siteId={66}
    //   sessionId="3055621590"
    //   portalid="311779680.COM"
    //   optInStatus="y"
    //   email=""
    // />

    // multiple vift payment MA _ MOR
    // <OrderConfirmationContainerWrapper
    //   orderId="7252093"
    //   shopperId="wjZzYhzpzejjezhqxqzqwmVzxYqVzqmqhXjYzxhkh"
    //   countrycode="USA"
    //   languagecode="ENG"
    //   sitetype="SHP"
    //   pcid="1310279719"
    //   siteId={66}
    //   sessionId="3055621590"
    //   portalid="311779680.COM"
    //   optInStatus="y"
    //   email=""
    // />

    // without VIFT payment
    // <OrderConfirmationContainerWrapper
    //   orderId="7252328"
    //   shopperId="wjZzYhzpzejjezhqxqzqwmVzxYqVzqmqhXjYzxhkh"
    //   countrycode="USA"
    //   languagecode="ENG"
    //   sitetype="SHP"
    //   pcid="1310279719"
    //   siteId={66}
    //   sessionId="3055621590"
    //   portalid="311779680.COM"
    //   optInStatus="y"
    //   email=""
    // />
    // with VIFT + coupon payment
    // <OrderConfirmationContainerWrapper
    //   orderId="7252867"
    //   shopperId="qXjXhwhYzWZWWzhVeZzqmmezYZmXhUZXxVwhzxqeqm"
    //   countrycode="USA"
    //   languagecode="ENG"
    //   sitetype="SHP"
    //   pcid="1276680871"
    //   siteId={66}
    //   sessionId="3055624454"
    //   portalid="SHOPMARKET.COM"
    //   optInStatus="y"
    //   email=""
    // />
    // with text updates
    // <OrderConfirmationContainerWrapper
    //   orderId="7252868"
    //   shopperId="qXjXhwhYzWZWWzhVeZzqmmezYZmXhUZXxVwhzxqeqm"
    //   countrycode="USA"
    //   languagecode="ENG"
    //   sitetype="SHP"
    //   pcid="1276680871"
    //   siteId={66}
    //   sessionId="3055624454"
    //   portalid="SHOPMARKET.COM"
    //   optInStatus="y"
    //   email=""
    // />
    // with Gift Card
    // <OrderConfirmationContainerWrapper
    //   orderId="7257619"
    //   shopperId="ZpXYpYwzzXVYUzhkZhzYpYmzYxpUmjmejWpqzjqzz"
    //   countrycode="USA"
    //   languagecode="ENG"
    //   sitetype="SHP"
    //   pcid="6565841"
    //   siteId={66}
    //   sessionId="3055633431"
    //   portalid="7052764.COM"
    //   optInStatus="y"
    //   email=""
    // />
    // // BV and IBV product 
    // <OrderConfirmationContainerWrapper
    //   orderId="7257621"
    //   shopperId="xhzpWqkmzxmmxzhUWpzqjWUzhzkZjWXzUUjzzehjjp"
    //   countrycode="USA"
    //   languagecode="ENG"
    //   sitetype="SHP"
    //   pcid="1000091972"
    //   siteId={66}
    //   sessionId="3055647283"
    //   portalid="TESTMA44.COM"
    //   optInStatus="n"
    //   email=""
    // />
    // Coral 3 Beauty Product
    //  <OrderConfirmationContainerWrapper
    //   orderId="7249899"
    //   shopperId="hmUhkqpzzezhXzhhVqzZmxWzqeYXkUjzqXjpzpqqm"
    //   countrycode="USA"
    //   languagecode="ENG"
    //   sitetype="SHP"
    //   pcid="1947765337"
    //   siteId={66}
    //   sessionId="3055612713"
    //   portalid="AZXCXLL3SE3WS3DDTOO8I9.COM"
    //   optInStatus="y"
    //   email=""
    // />
    // guest checkout order
    //  <OrderConfirmationContainerWrapper
    //   orderId="7259391"
    //   shopperId=""
    //   countrycode="USA"
    //   languagecode="ENG"
    //   sitetype="SHP"
    //   pcid=""
    //   siteId={66}
    //   sessionId="3055657678"
    //   portalid="SHOPMARKET.COM"
    //   optInStatus="n"
    //   email="testsep2678@yopmail.com"
    // />
    // cashback 
    //  <OrderConfirmationContainerWrapper
    //   orderId="7262856"
    //   shopperId="YUXUeYeqzeYzUzhkYVzZhUezzwUwUmqUpVmYzjqzz"
    //   countrycode="USA"
    //   languagecode="ENG"
    //   sitetype="SHP"
    //   pcid="1918885741"
    //   siteId={66}
    //   sessionId="3055677131"
    //   portalid="3309812.COM"
    //   optInStatus="n"
    //   email=""
    // />
  );
};

export default App;
createRoot(document.getElementById("app")!).render(<App />);
