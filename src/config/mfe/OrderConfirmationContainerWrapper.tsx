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
import "../../App.css";
import {
  getCustomerProfileAlt,
  getEwalletCustomerInfo,
  getMicroShopperPortalDetails,
  getOrderConfirmationRecommendations,
  getOrderDetails,
} from "../api";
import FeedbackForm from "../../components/CustomerFeedback";
import Feedback from "../../components/CustomerFeedback/Feedback";
import { GuestCheckout } from "../../components/GuestCheckout";

const OrderConfirmationContainerWrapper = (appConfig: {
  orderId: string;
  shopperId: string;
  siteId: number;
  pcid: string;
  sessionId: string;
  languagecode: string;
  sitetype: string;
  countrycode: string;
  portalid: string;
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
        const customerDetails = await getCustomerProfileAlt(appConfig.pcid);
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
          appConfig.siteId,
          shopperPortalData?.merchantCountry,
          appConfig.languagecode,
          appConfig.countrycode,
          appConfig.sitetype
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
          rightText={
            section.shippingDate
              ? `Estimated Delivery Date ${getValidShippingDate(
                  section.shippingDate
                )}`
              : undefined
          }
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
        <SectionCard title="Refer and Earn $25 - $30" extraClass="oc-no-padding">
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
        <OrderUpdates
          orderId={orderDetails?.invoices?.map((invoice) => invoice.attributes)}
          shopperId="UmkepZWVzmqqVzhVqkzZmwqzWeXVYVWXWZZpzxhemz"
          pcid="2637612996"
          siteId={222}
          sessionId="3055555192"
          languagecode="ENG"
          sitetype="SHP"
          countrycode="USA"
          portalid="2245355.COM"
        />
      </SectionCard>

      {cashback?.cashbackAvail && parseFloat(cashback?.cashbackAvail) > 0 && (
        <SectionCard title="VIFT Balance" gradient>
          <div className="oc-vift-tag">
            <VText />
            <span className="oc-vift-cb">${cashback?.cashbackAvail}</span>
          </div>
        </SectionCard>
      )}
    </>
  );

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleResize = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };

    // Set initial value
    handleResize(mediaQuery);

    // Add listener
    mediaQuery.addEventListener("change", handleResize);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="oc-app-container">
      <div className="oc-app-container-wrapper">
        {/* Show order total mobile only on mobile screens */}
        {isMobile && (
          <div className="oc-order-total-mobile">
            <span>Order Total</span>
            <span className="oc-order-total-amount">
              {orderDetails?.orderTotal &&
              orderDetails.orderTotal.toString().trim() !== ""
                ? orderDetails.currencySymbol +
                  orderDetails.orderTotal.toFixed(2)
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
              {/* SHOW WHEN HERE DESKTOP VIEW */}
              {!isMobile && (
                <div className="oc-order-notifications">
                  <Notification
                    icon="ChangeCircle"
                    title="Subscribe & Save 10%"
                    link="https://www.shop.com/nbts/account/autoship?ham=10"
                    message="Explore Subscribe & Save"
                  />
                  <Notification
                    icon="Person"
                    title={`Your Shop Consultant is ${shopperPortalData?.consultantName}`}
                    email={shopperPortalData?.ownerEmail}
                    message={`Contact ${shopperPortalData?.consultantName}`}
                  />
                </div>
              )}
            </div>
            <Container left={leftContent} right={rightContent} />
            {customerDetails?.data.pc_types.find(
              (pcType) => pcType.pc_type == "isEZ"
            )?.enabled && (
              <GuestCheckout
                email={customerDetails?.data.email_address ?? ""}
                sessionId={appConfig.sessionId}
                customerDetails={customerDetails as CustomerDetails}
                setCustomerDetails={setCustomerDetails}
              />
            )}
            {isMobile && (
              <div className="oc-order-notifications">
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
            )}
            <SectionCard title="Health Quiz" extraClass="oc-no-padding">
              <HealthQuiz />
            </SectionCard>
            {recommendations && (
              <>
                <div className="oc-recommended-products-header">
                  <SectionCard title="Our Top Product Recommendations" />
                </div>
                <div className="oc-recommended-products-container">
                  {recommendations.map((product) => (
                    <RecommendedProduct
                      product={product}
                      currency={orderDetails?.currencySymbol}
                      key={product.prodID}
                    />
                  ))}
                </div>
              </>
            )}

            <Feedback
              sessionId={appConfig.sessionId}
              siteId={appConfig.siteId.toString()}
              pcId={appConfig.pcid}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default OrderConfirmationContainerWrapper;
