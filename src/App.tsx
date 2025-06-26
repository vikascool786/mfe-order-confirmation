import "./App.css";
import VText from "./assets/svgs/VText";
import Notification from "./components/Notifications";
import OrderHeader from "./components/OrderHeader";
import OrderSummary from "./components/OrderSummary";
import { OrderUpdates } from "./components/OrderUpdates";
import PaymentMethod from "./components/PaymentMethod";
import ProductSummary from "./components/ProductSummary";
import ShippingAddress from "./components/ShippingAddress";
import Container from "./layout/Container";
import SectionCard from "./layout/SectionCard";

const App = () => {
  const leftContent = (
    <>
      <SectionCard
        title="Product Summary"
        rightText="Estimated Delivery Date Tuesday, April 15"
      >
        <ProductSummary
          products={[
            {
              image:
                "https://img.shop.com/Image/210000/214100/214196/products/561800352.jpg?size=1600x1600",
              subtotal: "$25.00",
              tax: "$2.02",
              shipping: "$6.00",
              cashback: "$10.47",
              total: "$12.55",
            },
          ]}
        />
      </SectionCard>

      <SectionCard title="Shipping Summary">
        <ShippingAddress
          name="Ruby Boyle"
          address="1 Lower Ragsdale Dr"
          cityStateZip="Monterey, CA 93940"
          phone="831-123-4567"
        />
      </SectionCard>
    </>
  );

  const rightContent = (
    <>
      <SectionCard title="Order Summary">
        <PaymentMethod method="Mastercard 0469" />
        <OrderSummary
          subtotal="$25.00"
          tax="$2.02"
          shipping="$6.00"
          cashback="$10.47"
          total="$12.55"
        />
      </SectionCard>
      <SectionCard title="Order Updates">
        <OrderUpdates updates={[]} />
      </SectionCard>

      <SectionCard title="VIFT Balance" gradient>
        <div className="vift-tag">
          <VText />
          <strong>$13.42</strong>
        </div>
      </SectionCard>
    </>
  );

  return (
    <div className="app-container">
      <div className="order-confirmation-container">
        <OrderHeader
          name="Ruby"
          orderId="1235378422"
          amount="13.42"
          deliveryDate="Tuesday, April 15"
          email="rubyb@shop.com"
        />
        <div className="order-notifications">
          <Notification
            icon="ChangeCircle"
            title="Subscribe & Save 10%"
            message="Explore Subscribe & Save"
          />
          <Notification
            icon="Person"
            title="Your Shop Consultant is Jane Doe"
            message="Contact Jane Doe"
          />
        </div>
      </div>
      <Container left={leftContent} right={rightContent} />
    </div>
  );
};

export default App;
