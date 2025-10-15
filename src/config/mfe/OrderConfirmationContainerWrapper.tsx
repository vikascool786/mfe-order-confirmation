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
  AttributeList,
  CustomerDetails,
  IBluePrintResponse,
  ICashback,
  Invoice,
  IOrder,
  IShopperInfo,
  ShopperPortal,
  ShopperResponse,
} from "../../types";
import { getFormattedDate } from "../../utils/getDateFormat";
import { getPaymentMethod } from "../../utils/getPaymentMethod";
import { getProductsPerStore } from "../../utils/getProductsPerStore";
import "../../App.css";
import {
  getAttributeList,
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
  const [customerDetails, setCustomerDetails] = useState<ShopperResponse>();
  const [shopperPortalData, setShopperPortalData] = useState<ShopperPortal>();
  const [contentStrings, setContentStrings] = useState<IBluePrintResponse>(
    {} as IBluePrintResponse
  );
  const [microShopperPortalError, setMicroShopperPortalError] = useState(false);
  const [isEz, setIsEz] = useState<boolean>(false);

  const [recommendations, setRecommendations] =
    useState<IRecommendedProduct[]>();
  const [loading, setLoading] = useState(false);
  const [cashback, setCashback] = useState<ICashback | null>(null);

  const address = orderDetails?.invoices?.map(
    (invoice) => invoice.shippingAddress
  )[0];

  const hasCore3Subscription = orderDetails.invoices?.some((invoice) =>
    invoice.items?.some(
      (item) =>
        item.subscriptionOption === "CORE3" ||
        item.subscriptionOption === "CORE3_B"
    )
  );

  //check guest user already created account or not
  useEffect(() => {
    if (!orderDetails?.shopperID) return;
    const getIsEz = async () => {
      try {
        setLoading(true);
        const attributes = await getAttributeList(orderDetails?.shopperID);
        const data = attributes.data;
        // setAttributeList(data);

        const prePcAttribute = data.find(
          (attr: AttributeList) => attr.typeId === 214
        );
        // If typeId 214 exists and value === 0 → account created
        if (prePcAttribute?.value === 0) {
          setIsEz(false);
        } else {
          setIsEz(true);
        }

      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    getIsEz();
  }, [orderDetails?.shopperID]);


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

        // Handle only microShopperDetails with its own try/catch
        try {
          const microShopperDetails = await getMicroShopperPortalDetails(
            shopperData.shopperId
          );
          setShopperPortalData(microShopperDetails.data);
          setMicroShopperPortalError(false);

          // --- Dependent API: call only if portal data is available ---
          if(microShopperDetails?.data?.merchantCountry){
            const cashbackResponse = await getEwalletCustomerInfo(
              shopperData.pcId,
              appConfig.siteId,
              shopperPortalData?.merchantCountry,
              appConfig.languagecode,
              appConfig.countrycode,
              appConfig.sitetype
            );
            setCashback(cashbackResponse?.data.data);
          }
        } catch (err: any) {
          console.error("Failed to fetch micro shopper portal:", err);
          // Optionally setting some error state to hide component
          setMicroShopperPortalError(true);
        }

        setCustomerDetails(customerDetails.data);

        const orderResponse = await getOrderDetails(
          shopperData.shopperId,
          appConfig.orderId
        );
        setOrderDetails(orderResponse.data);
        setAllDataObjectProperty(orderResponse.data, appConfig.optInStatus);

        const recResponse = await getOrderConfirmationRecommendations(
          shopperData.pcId,
          appConfig.siteId
        );

        //remove duplicate products based on prodID
        if (recResponse && recResponse.data && recResponse.data.length > 0) {
          const products: IRecommendedProduct[] = recResponse.data[0].products;

          const uniqueProducts: IRecommendedProduct[] = Array.from(
            new Map<number, IRecommendedProduct>(
              products.map((product: IRecommendedProduct) => [product.prodID, product])
            ).values()
          );

          setRecommendations(uniqueProducts);
        }

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
              ? `${contentStrings?.response?.estimatedDeliveryDate
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
            shopperPortalData={shopperPortalData}
            shopperAttributes={customerDetails}
          />
        </SectionCard>
      ))}

      {isMobile ? (
        <>
          {orderDetails?.id && (
            <SectionCard title={contentStrings?.response?.orderSummary}>
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
          title={(() => {
            // Flatten all items from all invoices
            const allItems =
              orderDetails?.invoices?.flatMap(
                (invoice) => invoice.items || []
              ) || [];

            // Check which subscription exists
            const beautyItem = allItems.find(
              (item) => item.subscriptionOption === "CORE3_B"
            );
            const healthItem = allItems.find(
              (item) => item.subscriptionOption === "CORE3"
            );

            // Decide profit value
            const profitValue = beautyItem
              ? `$${beautyItem.flatRateRetailProfit || 0}`
              : healthItem
                ? `$${healthItem.flatRateRetailProfit || 0} - $${healthItem.recommendedFrequency || 0
                }`
                : "";

            return `${contentStrings?.response?.referAndEarn || "Refer & Earn"
              } ${profitValue}`;
          })()}
          extraClass="oc-no-padding"
        >
          <ReferEarn contentStrings={contentStrings} order={orderDetails} portalId={appConfig?.portalid} creditUser={customerDetails?.creditUser} />
        </SectionCard>
      )}
      {!isMobile && orderDetails?.id && (
        <SectionCard title={contentStrings?.response?.orderSummary}>
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
          orderFlagID={orderDetails?.orderFlags?.map((flag) => flag)}
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
        !isMobile &&
        customerDetails?.attributeList?.some(
          (attr) => attr.typeId === 214 && attr.value === 1
        ) && isEz && (
          <GuestCheckout
            email={customerDetails?.email ?? ""}
            orderDetails={orderDetails}
            sessionId={appConfig.sessionId}
            customerDetails={customerDetails as ShopperResponse}
            setCustomerDetails={setCustomerDetails}
            contentStrings={contentStrings}
          />
        )}

      {!microShopperPortalError && cashback?.cashbackAvail && parseFloat(cashback?.cashbackAvail) > 0 && (
        <SectionCard title={contentStrings?.response?.viftBalance} gradient>
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
    <div className="qa-order-confirmation-page oc-app-container">
      <div className="oc-app-container-wrapper">
        {/* Show order total mobile only on mobile screens */}
        {isMobile && (
          <div className="oc-order-total-mobile">
            <span>{contentStrings?.response?.orderTotal}</span>
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
                    link="/shop_consultant.xhtml"
                    message={`Contact ${shopperPortalData?.consultantName}`}
                  />
                </div>
              )}
            </div>
            <Container left={leftContent} right={rightContent} />
            {isMobile &&
              customerDetails?.attributeList?.some(
                (attr) => attr.typeId === 214 && attr.value === 1
              ) && isEz && (
                <GuestCheckout
                  email={customerDetails?.email ?? ""}
                  sessionId={appConfig.sessionId}
                  customerDetails={customerDetails as ShopperResponse}
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
              title={contentStrings?.response?.healthQuiz}
              extraClass="oc-no-padding"
            >
              <HealthQuiz contentStrings={contentStrings} />
            </SectionCard>
            {recommendations && recommendations?.length > 0 && (
              <>
                <div className="oc-recommended-products-header">
                  <SectionCard
                    title={
                      contentStrings?.response &&
                      contentStrings?.response[
                      "orders-ourTopProductRecommendations"
                      ]
                      // 'Our Top Product Recommendations'
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
