import React, { useEffect, useState } from "react";
import VText from "../../assets/svgs/VText";
import HealthQuiz from "../../components/HealthQuiz";
import Notification from "../../components/Notifications";
import OrderHeader from "../../components/OrderHeader";
import OrderSummary from "../../components/OrderSummary";
import { OrderUpdates } from "../../components/OrderUpdates";
import PaymentMethod from "../../components/PaymentMethod";
import ProductSummary from "../../components/ProductSummary";
import RecommendedProduct from "../../components/RecommendedProduct";
import { IRecommendedProduct } from "../../components/RecommendedProduct/types";
import { ReferEarn } from "../../components/ReferEarn";
import ShippingAddress from "../../components/ShippingAddress";
import Container from "../../layout/Container";
import SectionCard from "../../layout/SectionCard";
import { Spinner } from "../../layout/Spinner";
import {
  CustomerDetails,
  ICashback,
  Invoice,
  IOrder,
  ShopperPortal,
} from "../../types";
import { getFormattedDate } from "../../utils/getDateFormat";
import { getPaymentMethod } from "../../utils/getPaymentMethod";
import { getProductsPerStore } from "../../utils/getProductsPerStore";
import {
  getCustomerProfileAlt,
  getEwalletCustomerInfo,
  getMicroShopperPortalDetails,
  getOrderConfirmationRecommendations,
  getOrderDetails,
} from "../api";

const API_KEY = "759ef1fc9e4c4e8bbf900db5f4b7caba";

const OrderConfirmationContainerWrapper = (appConfig: {
  orderId: string;
  shopperId: string;
  siteId: number;
  pcid: string;
  sessionId: string;
}) => {
  const [orderDetails, setOrderDetails] = useState<IOrder>({} as IOrder);
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>();
  const [shopperPortalData, setShopperPortalData] = useState<ShopperPortal>();
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
        const customerDetails = await getCustomerProfileAlt(
          appConfig.pcid,
          API_KEY
        );
        const microShopperDetails = await getMicroShopperPortalDetails(
          appConfig.shopperId
        );
        setShopperPortalData(microShopperDetails.data);
        setCustomerDetails(customerDetails.data);

        const orderResponse = await getOrderDetails(
          appConfig.shopperId,
          appConfig.orderId
        );
        setOrderDetails(orderResponse.data);

        const recResponse = await getOrderConfirmationRecommendations(
          appConfig.pcid,
          appConfig.siteId
        );
        setRecommendations(recResponse.data[0].products);

        const cashbackResponse = await getEwalletCustomerInfo(
          appConfig.pcid,
          appConfig.siteId
        );
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
          extraClass="add-gap"
          // get shipping date in this format Tuesday, April 15
          rightText={`Estimated Delivery Date ${getValidShippingDate(
            section.shippingDate
          )}`}
          rightTextExtraClass={
            Object.keys(orderDetails?.invoices).length === 1
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
      {orderDetails?.id && (
        <SectionCard title="Order Summary">
          <PaymentMethod methods={getPaymentMethod(orderDetails) ?? {}} />
          <OrderSummary order={orderDetails} />
        </SectionCard>
      )}
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
              deliveryDate={
                Object.keys(orderDetails?.invoices).length === 1
                  ? getFormattedDate(
                      productSummaryPerStore[0]?.shippingDate as string
                    )
                  : ""
              }
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
                title={`Your Shop Consultant is ${shopperPortalData?.consultantName}`}
                email={shopperPortalData?.ownerEmail}
                message={`Contact ${shopperPortalData?.consultantName}`}
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

export default OrderConfirmationContainerWrapper;
