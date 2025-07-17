export interface IRecommendedProduct {
  catalogID: number
  level2CategoryID: number
  volumeID: number
  prodContainerID: number
  prodID: number
  webLevel: number
  channelBits: number[]
  productTypeFlags: number[]
  title: string
  description: string
  onSale: boolean
  cpcRate: number
  localPrice: number
  minPrice: number
  minRegularPrice: number
  minOnSalePrice: number
  minNotOnSalePrice: number
  maxPrice: number
  maxRegularPrice: number
  maxOnSalePrice: number
  maxNotOnSalePrice: number
  localeID: number
  cashBack: number
  ibv: number
  ibv2: number
  storeName: string
  bv: number
  stdCashBack: number
  incCashBack: number
  prodsCatalogSKU: string
  distributorPrice: number
  prodInventoryStatus: number
  productType: string
  shippingPrice: number
  eGiftsOk: boolean
  ukPpc: number
  autoShipEnabled: boolean
  hasOptions: boolean
  minIbv: number
  minBv: number
  mindpf: number
  freeShipping: boolean
  shipFree: boolean
  currencyCode: string
  custIncPoints: number
  siteType: string[]
  filterFlag: string[]
  shipExclusion: string[]
  formCodes: string[]
  oneCart: boolean
  linkOff: boolean
  productCategoryID: number
  warrantyId: number
  miPoints: number
  campaignEndDate: number
  prop65: string
  isNew: boolean
  ibvStandard: number
  ibvOnly: number
  ibvStandardCampaign: number
  ibvOnlyCampaign: number
  showDistributorCashback: boolean
  freeShippingThreshold: number
  ibvStandardMin: number
  ibvOnlyMin: number
  ibvStandardCampaignMin: number
  ibvOnlyCampaignMin: number
  price: number
  tempOOSProductFlag: boolean
  channelBitsWebLevel1: string[]
  channelBitsWebLevel2: string[]
  thumbnailUrl: string
  baseUrl: string
  deliveryRestrictionCode: number
  department: string
  promoDescription: string
  productSlug: string
  productSubName1: string
  productSubName2: string
  sizeChart: string
  image: Image
  optionImages: OptionImage[]
  badges: Badge[]
  marketingTags: MarketingTag[]
  blobAltText: string
  sizeChartAltText: string
  opContainerId: number
  rating: string
  reviewCountsGranular: string
  reviewCount: number
  AutoShipCashbackPercent: number
  PlainUrl: string
  IBVStandardCampaignPercent: number
  AutoShipIBVStandardPercent: number
  IncreasedCashBackPercent: number
  AutoShipIBVOnlyAmount: number
  CreateDate: number
  AutoShipIBVStandardAmount: number
  AutoShipCashbackAmount: number
  MinDistributorOriginalPrice: number
  AutoShipIBVOnlyPercent: number
  HasDistributorSalePrice: boolean
  StandardCashBackPercent: number
  IBVOnlyCampaignPercent: number
  CIPointsPercent: number
  IBVStandardPercent: number
  MaxDistributorOriginalPrice: number
  MIPointsPercent: number
  AltText: string
  IBVOnlyPercent: number
}

export interface Image {
  MaxHeight: number
  BaseUrl: string
  MaxWidth: number
  PlainUrl: string
  AltText: string
}

export interface OptionImage {
  SkuResizeImage: SkuResizeImage
  SkuAltResizeImage: SkuAltResizeImage
  OptionValue: string
  VolumeId: number
  siteType: string
}

export interface SkuResizeImage {
  BaseUrl: string
  PlainImageUrl: string
  Burst: Burst
}

export interface Burst {
  PIMId: number
}

export interface SkuAltResizeImage {
  BaseUrl: string
  PlainImageUrl: string
}

export interface Badge {
  name: string
  description: string
  sortOrder: number
  images: Images
  PIMId: number
}

export interface Images {
  siteImage: string
  appImage: string
}

export interface MarketingTag {
  name: string
  description: string
  type: string
  distCostSavingsPercentage: number
  retailCostSavingsPercentage: number
  PIMId: number
}
