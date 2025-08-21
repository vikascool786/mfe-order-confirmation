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
  IBluePrintResponse,
  ICashback,
  Invoice,
  IOrder,
  IShopperInfo,
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
  getOrderConfirmationContentStrings,
  getOrderConfirmationRecommendations,
  getOrderDetails,
  getValidShopperId,
} from "../api";
import FeedbackForm from "../../components/CustomerFeedback";
import Feedback from "../../components/CustomerFeedback/Feedback";
import { GuestCheckout } from "../../components/GuestCheckout";
import { setAllDataObjectProperty } from "../../utils/setDataObjectProperty";

const OrderConfirmationContainerWrapper = (appConfig: {
  orderId: string;
  shopperId: string;
  siteId: number;
  pcid: string;
  email?: string;
  sessionId: string;
  languagecode: string;
  sitetype: string;
  countrycode: string;
  portalid: string;
  optInStatus: string;
}) => {
  const [orderDetails, setOrderDetails] = useState<IOrder>({} as IOrder);
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>();
  const [shopperPortalData, setShopperPortalData] = useState<ShopperPortal>();
  const [contentStrings, setContentStrings] = useState<IBluePrintResponse>(
    {} as IBluePrintResponse
  );
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
        const contentStringResponse =
          await getOrderConfirmationContentStrings();
        setContentStrings(contentStringResponse);
        const shopperData: IShopperInfo =
          appConfig.shopperId && appConfig.shopperId.length > 1
            ? { shopperId: appConfig.shopperId, pcId: appConfig.pcid }
            : await getValidShopperId(appConfig.email as string);
        const customerDetails = await getCustomerProfileAlt(shopperData.pcId);
        const microShopperDetails = await getMicroShopperPortalDetails(
          shopperData.shopperId
        );
        setShopperPortalData(microShopperDetails.data);
        setCustomerDetails(customerDetails.data);

        const orderResponse = await getOrderDetails(
          shopperData.shopperId,
          appConfig.orderId
        );
        setOrderDetails(orderResponse.data);
        setAllDataObjectProperty(orderResponse.data, appConfig.optInStatus);

        const recResponse = await getOrderConfirmationRecommendations(
          appConfig.pcid,
          appConfig.siteId
        );

        if ((recResponse && recResponse.data && recResponse.data, length > 0)) {
          setRecommendations(recResponse.data[0].products);
        }

        const cashbackResponse = await getEwalletCustomerInfo(
          shopperData.pcId,
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

  const leftContent = (
    <>
      {productSummaryPerStore.map((section, index) => (
        <SectionCard
          title={section.storeName}
          extraClass="add-gap"
          borderTop={isMobile}
          // get shipping date in this format Tuesday, April 15
          rightText={
            section.shippingDate
              ? `${
                  contentStrings?.response.estimatedDeliveryDate
                } ${getValidShippingDate(section.shippingDate)}`
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

      {isMobile ? (
        <>
          {orderDetails?.id && (
            <SectionCard title={contentStrings?.response.orderSummary}>
              <PaymentMethod
                methods={getPaymentMethod(orderDetails) ?? {}}
                contentStrings={contentStrings}
              />
              <OrderSummary
                order={orderDetails}
                contentStrings={contentStrings}
              />
            </SectionCard>
          )}
          <SectionCard
            title={contentStrings?.response?.["orders-shippingSummary"]}
          >
            {address && (
              <ShippingAddress
                name={address?.first + " " + address?.last}
                address={address?.address1}
                cityStateZip={`${address?.city}, ${address?.state} ${address?.zip}`}
                phone={address?.phone}
                contentStrings={contentStrings}
              />
            )}
          </SectionCard>
        </>
      ) : (
        <SectionCard
          title={contentStrings?.response?.["orders-shippingSummary"]}
        >
          {address && (
            <ShippingAddress
              name={address?.first + " " + address?.last}
              address={address?.address1}
              cityStateZip={`${address?.city}, ${address?.state} ${address?.zip}`}
              phone={address?.phone}
              contentStrings={contentStrings}
            />
          )}
        </SectionCard>
      )}
    </>
  );

  const rightContent = (
    <>
      {hasCore3Subscription && (
        <SectionCard
          title={contentStrings?.response.referAndEarn}
          extraClass="oc-no-padding"
        >
          <ReferEarn contentStrings={contentStrings} />
        </SectionCard>
      )}
      {!isMobile && orderDetails?.id && (
        <SectionCard title={contentStrings?.response.orderSummary}>
          <PaymentMethod
            methods={getPaymentMethod(orderDetails) ?? {}}
            contentStrings={contentStrings}
          />
          <OrderSummary order={orderDetails} contentStrings={contentStrings} />
        </SectionCard>
      )}
      <SectionCard title={contentStrings?.response?.orderUpdates}>
        <OrderUpdates
          orderId={orderDetails?.invoices?.map((invoice) => invoice.attributes)}
          shopperId={appConfig.shopperId}
          pcid={appConfig.pcid}
          siteId={appConfig.siteId}
          sessionId={appConfig.sessionId}
          languagecode={appConfig.languagecode}
          sitetype={appConfig.sitetype}
          countrycode={appConfig.countrycode}
          portalid={appConfig.portalid}
          contentStrings={contentStrings}
        />
      </SectionCard>

      {orderDetails &&
        customerDetails?.data.pc_types.find(
          (pcType) => pcType.pc_type == "isEZ"
        )?.enabled && (
          <GuestCheckout
            email={customerDetails?.data.email_address ?? ""}
            orderDetails={orderDetails}
            sessionId={appConfig.sessionId}
            customerDetails={customerDetails as CustomerDetails}
            setCustomerDetails={setCustomerDetails}
            contentStrings={contentStrings}
          />
        )}

      {cashback?.cashbackAvail && parseFloat(cashback?.cashbackAvail) > 0 && (
        <SectionCard title={contentStrings?.response.viftBalance} gradient>
          <div className="oc-vift-tag">
            <div>
              <VText />
            </div>
            <span className="oc-vift-cb">${cashback?.cashbackAvail}</span>
          </div>
        </SectionCard>
      )}
    </>
  );

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="oc-app-container">
      <div className="oc-app-container-wrapper">
        {/* Show order total mobile only on mobile screens */}
        {isMobile && (
          <div className="oc-order-total-mobile">
            <span>{contentStrings?.response.orderTotal}</span>
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
                contentStrings={contentStrings}
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
            {isMobile &&
              customerDetails?.data.pc_types.find(
                (pcType) => pcType.pc_type == "isEZ"
              )?.enabled && (
                <GuestCheckout
                  email={customerDetails?.data.email_address ?? ""}
                  sessionId={appConfig.sessionId}
                  customerDetails={customerDetails as CustomerDetails}
                  orderDetails={orderDetails}
                  setCustomerDetails={setCustomerDetails}
                  contentStrings={contentStrings}
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
            <SectionCard
              title={contentStrings?.response.healthQuiz}
              extraClass="oc-no-padding"
            >
              <HealthQuiz contentStrings={contentStrings} />
            </SectionCard>
            {recommendations && (
              <>
                <div className="oc-recommended-products-header">
                  <SectionCard
                    title={
                      contentStrings?.response[
                        "orders-ourTopProductRecommendations"
                      ]
                    }
                  />
                </div>
                <div className="oc-recommended-products-container">
                  {recommendations.map((product) => (
                    <RecommendedProduct
                      product={product}
                      currency={orderDetails?.currencySymbol}
                      key={product.prodID}
                      contentStrings={contentStrings}
                    />
                  ))}
                </div>
              </>
            )}

            <Feedback
              sessionId={appConfig.sessionId}
              siteId={appConfig.siteId.toString()}
              pcId={appConfig.pcid}
              contentStrings={contentStrings}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default OrderConfirmationContainerWrapper;
