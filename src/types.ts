export interface IOrder {
  id: number;
  orderDate: string;
  orderDateStr: string;
  shopperID: string;
  countryCode: string;
  languageCode: string;
  couponCode: string;
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
  lifetimeCashbackEarned: string;
  lifetimeCoaEarned: string;
  lifetimeTotalCashEarned: string;
  pendingCashbackAvail: string;
  cashbackAvail: string;
  coaAvail: string;
  redemptionThreshold: string;
  totalCoaCBAvail: string;
  pendingCoaAvail: string;
  ytdCoaEarned: string;
  isWalletEligible: boolean;
  newIbv: number;
  newCash: number;
  showNewCashOverlay: boolean;
}

export interface IShopperInfo {
  shopperId: string;
  pcId: string;
}

export interface CustomerDetails {
  data: Data;
}

export interface Data {
  pc_id: string;
  sponsor_id: string;
  ppc_date: string;
  first_name: string;
  last_name: string;
  gender: string;
  date_of_birth: string;
  home_phone: string;
  cell_phone: string;
  home_address: HomeAddress;
  email_address: string;
  start_date: string;
  transfer_date: string;
  shopper_id: string;
  shopper_cid: string;
  pc_types: PcType[];
  features: Feature[];
  mta_id: string;
  full_name: string;
  preferred_language_number: string;
  preferred_language_code: string;
  block_code: string;
  customer_status: string;
  referring_pc_id: string;
  nutrametrix_unsubscribe_date: string;
  disable_date: string;
  shop_portal_id: string;
  motives_portal_id: string;
  nutrametrix_portal_id: string;
  motives_teen_associate_portal_id: string;
  isotonix_portal_id: string;
  motives_pro_artist_portal_id: string;
  shop_global_portal_id: string;
  custom_mini_portal_id: string;
  is_ppc_ibv_incentive_option: boolean;
  is_po_box: boolean;
  mobile_phone_carrier: string;
  twilio_validated_mobile_phone_number: string;
  wechat_id: string;
}

export interface HomeAddress {
  address_1: string;
  address_2: string;
  address_3: string;
  address_4: string;
  address_5: string;
  address_6: string;
  address_7: string;
  district: string;
  area: string;
  city: string;
  state: string;
  postal_code: string;
  home_country: string;
}

export interface PcType {
  pc_type: string;
  enabled: boolean;
}

export interface Feature {
  feature_id: string;
  enabled: boolean;
}

export interface Meta {
  svrStatus: number;
  svrMessage: string;
  svrCtrlCode: string;
  svrCtrlName: string;
  svrLsDate: string;
  svrLsTime: string;
}

export interface ShopperPortal {
  id: number;
  portalId: string;
  name: string;
  consultantName: string;
  ownerCompanyName: string;
  ownerEmail: string;
  ownerPhone: string;
  repId: string;
  distId: string;
  guaAccountId: string;
  imageName: string;
  hasFreeShipping: boolean;
  autoShipDiscount: number;
  hasItransact: boolean;
  webCenterEnabled: boolean;
  webCenterName: string;
  isSiteBranded: boolean;
  isPayPalDisabled: boolean;
  hasAmex: boolean;
  hasDiscover: boolean;
  error: string;
  minShipPercent: number;
  minShipChange: number;
  global: boolean;
  merchantCountry: string;
  npo: boolean;
  productCountry: string;
  active: boolean;
}
export type DataObject = {
  [key: string]: any;
};

export interface IBluePrintResponse {
  checksum: string;
  metaData: MetaData;
  response: Response;
}

export interface MetaData {
  message: string[];
  status: string;
  code: string;
  type: string;
}

export interface Response {
  "order-pound": string;
  pleaseEnterComment: string;
  cashBack: string;
  subscribeAndSave: string;
  mobilePhone: string;
  quantity: string;
  changeYourHealth: string;
  orderConfirmation: string;
  estimatedDeliveryDate: string;
  orderConfirmationNumber: string;
  referAndEarn: string;
  provideEmailForContact: string;
  orderTotal: string;
  shippingAddress: string;
  in60Seconds: string;
  takeQuiz: string;
  shareOnInstagram: string;
  mobilePhoneRequired: string;
  orderSummary: string;
  wantToProvideFeedback: string;
  healthQuiz: string;
  "orders-thankYouForShoppingWithUs": string;
  finishAccount: string;
  createPassword: string;
  viftBalance: string;
  viftCashbackEarned: string;
  confirmationEmailSentTo: string;
  explore: string;
  "enterFeedbackHere-placeholder": string;
  termsAndConditionsApply: string;
  shareViaPinterest: string;
  shareOnFacebook: string;
  "orders-ourTopProductRecommendations": string;
  submitFeedback: string;
  feedback: string;
  giveFeedback: string;
  shareOnTiktok: string;
  orderUpdates: string;
  shareCore3WithFamily: string;
  errPhone: string;
  paymentMethod: string;
  createAccount: string;
  subTotal: string;
  orderNumber: string;
  printOrderConfirmation: string;
  tenDigits: string;
  dataRatesApply: string;
  total: string;
  weConstantlyStriveAndGreatly: string;
  shareThisProduct: string;
  vift: string;
  wantToReceiveTextMessage: string;
  orderConfirmationSubscribeAndSave: string;
  yourShopConsultantIs: string;
  constantlyLookingToImprove: string;
  willReceiveUpdatesAt: string;
  shareViaTwitter: string;
  "orders-shippingSummary": string;
}
