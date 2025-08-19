import { DataObject, IOrder } from "../types";

const dataObject: string = "dataObject";

export function setDataObjectProperty(property: string, value: any) {
  if (
    !(window as { [key: string]: any })[dataObject] ||
    typeof (window as { [key: string]: any })[dataObject] !== "object"
  ) {
    (window as { [key: string]: any })[dataObject] = {} as DataObject;
  }

  ((window as { [key: string]: any })[dataObject] as DataObject)[property] =
    value;
}

export const setAllDataObjectProperty = (
  orderData: IOrder,
  optInStatus: string
) => {
  if (!orderData) {
    return;
  }
  setDataObjectProperty("pageType", "OrderConfirmation");
  setDataObjectProperty("orderGrandTotal", orderData.grandTotal.toString());
  setDataObjectProperty("orderTotal", orderData.orderTotal.toString());
  setDataObjectProperty("orderPlacementDate", orderData.orderDate);
  setDataObjectProperty("shippingTotal", orderData.shippingTotal.toString());
  setDataObjectProperty("taxTotal", orderData.saleTaxTotal.toString());
  setDataObjectProperty("discountTotal", orderData.couponDiscount.toString());
  setDataObjectProperty(
    "order_earned_cashback_amount",
    orderData.cashbackTotal.toString()
  );
  setDataObjectProperty(
    "order_earned_extra_cashback_amount",
    orderData.extraCashbackAmount.toString()
  );
  setDataObjectProperty(
    "order_cashback_applied_amount",
    orderData.cashbackRedeemed.toString()
  );
  setDataObjectProperty(
    "order_cashback_applied",
    orderData.cashbackRedeemed > 0 ? "y" : "n"
  );
  setDataObjectProperty(
    "order_ewallet_applied_amount",
    orderData.walletAppliedAmount.toString()
  );
  setDataObjectProperty(
    "order_ewallet_applied",
    orderData.walletAppliedAmount > 0 ? "y" : "n"
  );
  setDataObjectProperty("couponCode", orderData?.couponCode || "");

  setDataObjectProperty("giftCardTotal", orderData.giftCardApplied.toString());

  setDataObjectProperty("orderId", orderData.id);

  setDataObjectProperty("optInStatus", optInStatus);

  setDerivedProperties(orderData);
};

const setDerivedProperties = (orders: IOrder) => {
  const prodContainerId: string[] = [];
  const opContainerID: string[] = [];
  const volumeID: string[] = [];
  const catelogName: string[] = [];
  const paymentData = orders.invoices[0]?.paymentMethod;
  let inclusiveTaxTotal = 0;
  const numberOfStores = orders.invoices.length;
  let numberOfProducts = 0;
  let quantity = 0;
  const mybuysCartItems: Array<{ sku: string; qty: string; price: string }> =
    [];
  const orderDataArray: any = [];
  const address = orders?.invoices?.map(
    (invoice) => invoice.shippingAddress
  )[0];

  for (const [key, store] of Object.entries(orders?.invoices)) {
    numberOfProducts += store.items.length;
    inclusiveTaxTotal += store.inclusiveTax;
    const orderData = {
      catalogName: store.storeName,
      total: store.total.toString(),
      salesTax: store.salesTaxCharge.toString(),
      shippingCharge: store.shippingCharge.toString(),
      city: store.shippingAddress.city,
      state: store.shippingAddress.state,
      country: store.shippingAddress.country,
      c: store.commissionPercentage.toString(),
      sf: store.monthlySubscriptionFee.toString(),
      of: store.orderReferralFee.toString(),
      pf: store.processingFee.toString(),
      invoiceItems: [],
    };
    store.items.forEach((item) => {
      quantity += item.quantity;
      catelogName.push(store.storeName);
      // @ts-ignore
      orderData.invoiceItems.push({
        sku: item.sku,
        productId: item.prodID.toString(),
        description: item.description,
        department: item.department,
        price: item.price.toString(),
        quantity: item.quantity.toString(),
        b1: item.bv.toString(),
        b2: item.ibv.toString(),
      });
      mybuysCartItems.push({
        sku: `${item.prodID}-${item.sku}`,
        qty: item.quantity.toString(),
        price: item.price.toString(),
      });
      prodContainerId.push(item.prodContainerID.toString());
      opContainerID.push(item.opContainerID.toString());
      volumeID.push(item.volumeID.toString());
    });
    orderDataArray.push(orderData);
  }

  setDataObjectProperty("order_payment_type", paymentData?.type);
  setDataObjectProperty(
    "order_payment_third_party_wallet",
    ["paypal", "sezzle"].includes(paymentData?.type.toLowerCase()!)
      ? paymentData?.type.toLowerCase()
      : ""
  );

  setDataObjectProperty("state", address?.state);
  setDataObjectProperty("zip", address?.zip);

  setDataObjectProperty("prodContainerId", prodContainerId.join(","));
  setDataObjectProperty("mybuysCartItems", mybuysCartItems);
  setDataObjectProperty("opContainerId", opContainerID.join(","));
  setDataObjectProperty("volumeId", volumeID.join(","));
  setDataObjectProperty("catalogName", catelogName.join(","));
  setDataObjectProperty("numberOfStores", numberOfStores.toString());
  setDataObjectProperty("quantity", quantity.toString());
  setDataObjectProperty("numberOfProducts", numberOfProducts.toString());
  setDataObjectProperty("orderData", { invoices: orderDataArray });
  setDataObjectProperty("VAT", inclusiveTaxTotal);
};
