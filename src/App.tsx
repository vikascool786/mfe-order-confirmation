import { useEffect, useState } from "react";
import "./App.css";
import VText from "./assets/svgs/VText";
import HealthQuiz from "./components/HealthQuiz";
import Notification from "./components/Notifications";
import OrderHeader from "./components/OrderHeader";
import OrderSummary from "./components/OrderSummary";
import { OrderUpdates } from "./components/OrderUpdates";
import PaymentMethod from "./components/PaymentMethod";
import ProductSummary from "./components/ProductSummary";
import RecommendedProduct from "./components/RecommendedProduct";
import { IRecommendedProduct } from "./components/RecommendedProduct/types";
import ShippingAddress from "./components/ShippingAddress";
import Container from "./layout/Container";
import SectionCard from "./layout/SectionCard";
import { Spinner } from "./layout/Spinner";
import { ORDER } from "./mocks/Order";
import { PRODUCTS } from "./mocks/RecommendedProducts";
import { ICashback, Invoice, IOrder } from "./types";
import { getFormattedDate } from "./utils/getDateFormat";
import { getProductsPerStore } from "./utils/getProductsPerStore";
import {
  getEwalletCustomerInfo,
  getOrderConfirmationRecommendations,
  getOrderDetails,
} from "./config/api";
import { ReferEarn } from "./components/ReferEarn";

const App = () => {
  const [orderDetails, setOrderDetails] = useState<IOrder>({} as IOrder);
  const [recommendations, setRecommendations] =
    useState<IRecommendedProduct[]>();
  const [loading, setLoading] = useState(false);
  const [cashback, setCashback] = useState<ICashback | null>(null);

  const address = orderDetails?.invoices?.map(
    (invoice) => invoice.shippingAddress
  )[0];

  const hasCore3Subscription = orderDetails.invoices?.some((invoice) =>
    invoice.items?.some((item) => item.subscriptionOption === "CORE3")
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const orderResponse = await getOrderDetails(
          "ZpXYpYwzzXVYUzhkZhzYpYmzYxpUmjmejWpqzjqzz",
          "7235116"
        );
        setOrderDetails(orderResponse.data);

        const recResponse = await getOrderConfirmationRecommendations(
          "1316760835",
          66
        );
        setRecommendations(recResponse.data[0].products);

        const cashbackResponse = await getEwalletCustomerInfo("6565841");
        setCashback(cashbackResponse.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const productSummaryPerStore = getProductsPerStore(
    orderDetails?.invoices ?? []
  );

  const showEstimatedDeliveryDate =
    productSummaryPerStore && productSummaryPerStore.length < 1
      ? getFormattedDate(productSummaryPerStore[0]?.shippingDate as string)
      : "";

  const getValidShippingDate = (date: string) => {
    const parsedDate = new Date(date);
    return isNaN(parsedDate.getTime())
      ? date
      : getFormattedDate(parsedDate.toDateString());
  };

  const leftContent = (
    <>
      {productSummaryPerStore.map((section, index) => (
        <SectionCard
          title={section.storeName}
          // get shipping date in this format Tuesday, April 15
          rightText={`Estimated Delivery Date ${getValidShippingDate(
            section.shippingDate
          )}`}
          rightTextExtraClass={
            productSummaryPerStore.length === 0
              ? ""
              : "estimated-shipping-date-color"
          }
          key={index}
        >
          <ProductSummary
            products={section.products}
            invoice={orderDetails.invoices[index] as Invoice}
            key={index}
          />
        </SectionCard>
      ))}

      <SectionCard title="Shipping Summary">
        {address && (
          <ShippingAddress
            name={address?.first + " " + address?.last}
            address={address?.address1}
            cityStateZip={`${address?.city}, ${address?.state} ${address?.zip}`}
            phone={address?.phone}
          />
        )}
      </SectionCard>
    </>
  );

  const rightContent = (
    <>
      {hasCore3Subscription && (
        <SectionCard title="Refer and Earn $25 - $30" extraClass="no-padding">
          <ReferEarn />
        </SectionCard>
      )}
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

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="app-container">
      {/* Show order total mobile only on mobile screens */}
      {isMobile && (
        <div className="order-total-mobile">
          <span>Order Total</span>
          <span className="order-total-amount">
            {orderDetails?.orderTotal &&
            orderDetails.orderTotal.toString().trim() !== ""
              ? orderDetails.currencySymbol + orderDetails.orderTotal
              : "$0.00"}
          </span>
        </div>
      )}
      {orderDetails && orderDetails.invoices && (
        <>
          <div className="order-confirmation-container">
            <OrderHeader
              name={address?.first ?? ""}
              orderId={orderDetails?.id?.toString()}
              deliveryDate={showEstimatedDeliveryDate}
              email={
                orderDetails.invoices.find((invoice) => invoice.billingEmail)
                  ?.billingEmail || ""
              }
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
