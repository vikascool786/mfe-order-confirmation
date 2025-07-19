export interface IOrder {
  id: number;
  orderDate: string;
  orderDateStr: string;
  shopperID: string;
  countryCode: string;
  languageCode: string;
  signatureRequired: number;
  invoices: Invoice[];
  currencySymbol: string;
  orderTotal: number;
  shippingTotal: number;
  shipPromoDiscTotal: number;
  saleTaxTotal: number;
  miscTax: number;
  vendorDiscount: number;
  couponDiscount: number;
  grandTotal: number;
  rounding: number;
  grandTotalAfterRounding: number;
  cashbackTotal: number;
  shopPointsTotal: number;
  walletAppliedAmount: number;
  extraCashbackType: string;
  extraCashbackAmount: number;
  extraCashbackPercent: number;
  bvTotal: number;
  ibvTotal: number;
  cipPointsOrderTotal: number;
  cashbackRedeemed: number;
  giftCardApplied: number;
  isEgift: boolean;
  autoShipID: number;
  hasGiftRegistryItems: boolean;
  isEligibleForOrderReTry: boolean;
  eligibleForOrderReTryFailureReason: string;
  coupons: any[];
  trackingId: string;
  orderDetails: OrderDetails;
  orderTrackingServiceInfo: OrderTrackingServiceInfo;
}

export interface Invoice {
  storeName: string;
  invoiceID: number;
  merchantReferenceNumber: string;
  billingAddress: BillingAddress;
  shippingAddress: ShippingAddress;
  billingEmail: string;
  catalogID: number;
  shippingMethodTypeID: number;
  manualShippingState: number;
  shippingMessage: string;
  specialInstructions: string;
  shippingCharge: number;
  standardShippingCharge: number;
  salesTaxCharge: number;
  salesTaxRate: number;
  discounts: number;
  subTotal: number;
  total: number;
  paymentQty: number;
  giftCardState: number;
  giftCard: string;
  checkoutGiftCardData: CheckoutGiftCardData;
  appliedCouponShipping: number;
  appliedCouponTax: number;
  appliedCouponSubTotal: number;
  paymentMethod: PaymentMethod;
  shopperID: number;
  displaySalesTax1: number;
  displaySalesTax2: number;
  extendedExciseTax: number;
  inclusiveTax: number;
  cashbackEarned: number;
  pointsEarned: number;
  bvEarned: number;
  ibvEarned: number;
  deleted: boolean;
  items: Item[];
  shippingMethodType: string;
  salesTaxType: string;
  invoiceStatusStateID: number;
  invoiceStatus: string;
  storeFrontUrl: string;
  attributes: Attribute[];
  estShipRange: string;
  shipPromoDiscTotal: number;
  cipPriceTotal: number;
  commissionPercentage: number;
  monthlySubscriptionFee: number;
  orderReferralFee: number;
  processingFee: number;
  orderAvailDate: string;
}

export interface BillingAddress {
  isPoBox: boolean;
  stateID: number;
  hasAddress: number;
  first: string;
  last: string;
  country: string;
  region: string;
  id: number;
  state: string;
  description: string;
  address1: string;
  address2: string;
  address3: string;
  phone: string;
  isoalpha3Code: string;
  city: string;
  zip: string;
  company: string;
  address4: string;
  address5: string;
  address6: string;
  address7: string;
  mi: string;
}

export interface ShippingAddress {
  isPoBox: boolean;
  stateID: number;
  hasAddress: number;
  first: string;
  last: string;
  country: string;
  region: string;
  id: number;
  state: string;
  description: string;
  address1: string;
  address2: string;
  address3: string;
  phone: string;
  isoalpha3Code: string;
  city: string;
  zip: string;
  company: string;
  address4: string;
  address5: string;
  address6: string;
  address7: string;
  mi: string;
}

export interface CheckoutGiftCardData {}

export interface PaymentMethod {
  type: string;
  typeID: number;
  categoryID: number;
  html: string;
  cvv: string;
  token: string;
  accountName: string;
  mask: string;
  expMonth: number;
  expYear: number;
  addressId: number;
  number: string;
  id: number;
  expires: string;
}

export interface Item {
  sku: string;
  description: string;
  department: string;
  brand: string;
  quantity: number;
  price: number;
  extendedPrice: number;
  prodID: number;
  prodContainerID: number;
  opContainerID: number;
  volumeID: number;
  catalogID: number;
  externalDisplayURL: string;
  httpReferer: string;
  ccsyn: number;
  specialShipping: number;
  specialShippingIsAbsolute: boolean;
  doNotTax: boolean;
  cannotBeDiscounted: boolean;
  hasIntlDescription: boolean;
  weight: number;
  dateAdded: string;
  extendedExciseTax: number;
  productCategoryID: number;
  cashback: number;
  totalCashBack: number;
  shopPoints: number;
  extShopPoints: number;
  bv: number;
  extBv: number;
  ibv: number;
  extIbv: number;
  productImage: string;
  maVendorId: string;
  shoppingCartId: number;
  options: string[];
  specialInstructionList: SpecialInstructionList[];
  productURL: string;
  cipPrice: number;
  extCipPrice: number;
  isCustomCocktail: boolean;
  prodAvailDate: string;
  autoShipEnabled: boolean;
  flatRateRetailProfit: any;
  id: number;
  autoShipFrequency: number;
  subscriptionOption?: string;
  onSale: boolean;
  isPurchaseable: boolean;
}

export interface SpecialInstructionList {
  specialInstructionTypeID: number;
  specialInstruction: string;
}

export interface Attribute {
  typeId: number;
  value: string;
}

export interface OrderDetails {
  rel: string;
  href: string;
  type: string;
}

export interface OrderTrackingServiceInfo {
  invoices: any[];
  discountTotal: number;
  couponCode: string;
}


export interface ICashback {
  lifetimeCashbackEarned: string
  lifetimeCoaEarned: string
  lifetimeTotalCashEarned: string
  pendingCashbackAvail: string
  cashbackAvail: string
  coaAvail: string
  redemptionThreshold: string
  totalCoaCBAvail: string
  pendingCoaAvail: string
  ytdCoaEarned: string
  isWalletEligible: boolean
  newIbv: number
  newCash: number
  showNewCashOverlay: boolean
}
