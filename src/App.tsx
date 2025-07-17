import "./App.css";
import { useEffect, useState } from "react";
import {
  getOrderDetails,
  getOrderConfirmationRecommendations,
  getEwalletCustomerInfo,
} from "./config/api";
import VText from "./assets/svgs/VText";
import HealthQuiz from "./components/HealthQuiz";
import Notification from "./components/Notifications";
import OrderHeader from "./components/OrderHeader";
import OrderSummary from "./components/OrderSummary";
import { OrderUpdates } from "./components/OrderUpdates";
import PaymentMethod from "./components/PaymentMethod";
import ProductSummary from "./components/ProductSummary";
import RecommendedProduct from "./components/RecommendedProduct";
import ShippingAddress from "./components/ShippingAddress";
import Container from "./layout/Container";
import SectionCard from "./layout/SectionCard";
import { PRODUCTS } from "./mocks/RecommendedProducts";
import { Spinner } from "./layout/Spinner";
import { IRecommendedProduct } from "./components/RecommendedProduct/types";
import { ICashback, IOrder } from "./types";
import { ORDER } from "./mocks/Order";

const App = () => {
  const [orderDetails, setOrderDetails] = useState<IOrder>();
  const [recommendations, setRecommendations] = useState<IRecommendedProduct[]>(
 
  );
  const [loading, setLoading] = useState(false);
  const [cashback, setCashback] = useState<ICashback | null>(null);

  const address = orderDetails?.invoices.map(invoice => invoice.shippingAddress)[0];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const orderResponse = await getOrderDetails(
          "mkYxXjppzhzmjzhxWzzpkYjzmYXZVzYWkeZjzwjhx",
          "7222198"
        );
        setOrderDetails(orderResponse.data);

        const recResponse = await getOrderConfirmationRecommendations(
          "1316760835",
          66
        );
        setRecommendations(recResponse.data[0].products);

        const cashbackResponse = await getEwalletCustomerInfo("6565841");
        console.log("Cashback Response:", cashbackResponse.data);
        setCashback(cashbackResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const leftContent = (
    <>
      <SectionCard
        title="Product Summary"
        rightText="Estimated Delivery Date Tuesday, April 15"
      >
        <ProductSummary invoices={orderDetails?.invoices || []} />
      </SectionCard>

      <SectionCard title="Shipping Summary">
        {address && <ShippingAddress
          name={address?.first + " " + address?.last}
          address={address?.address1}
          cityStateZip={`${address?.city}, ${address?.state} ${address?.zip}`}
          phone={address?.phone}
        />}
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
          <span className="vift-cb">
            ${cashback?.cashbackAvail || "$13.42"}
          </span>
        </div>
      </SectionCard>
    </>
  );

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="app-container">
      {orderDetails && (
        <>
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
          <SectionCard title="Health Quiz" extraClass="no-padding">
            <HealthQuiz />
          </SectionCard>
          <div className="recommended-products-header">
            <SectionCard title="Our Top Product Recommendations" />
          </div>
          {recommendations && (
            <div className="recommended-products-container">
              {recommendations.map((product) => (
                <RecommendedProduct
                  product={product}
                  currency={orderDetails?.currencySymbol}
                  key={product.prodID}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;
