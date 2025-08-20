import axios from "axios";
import {
  GET_API_ENDPOINT_BASE_URL_FOR_GUEST,
  GET_API_ENDPOINT_BASE_URL_FOR_TRANSLATIONS,
  GET_API_ENDPOINT_BASE_URL_ONLY,
  GET_API_KEY,
  GET_API_MODE,
} from "../../utils/urlResolver";
import { IBluePrintResponse, IShopperInfo } from "../../types";

// Extend Window interface to include FS property
declare global {
  interface Window {
    FS?: {
      getCurrentSessionURL?: () => string;
    };
  }
}

const apiClient = axios.create({
  baseURL: GET_API_ENDPOINT_BASE_URL_ONLY(),
  headers: {
    "Content-Type": "application/json",
  },
});

// Get Order Details
export const getOrderDetails = (shopperId: string, orderNumber: string) => {
  return apiClient.get(`/store-orders/v1/Order/${shopperId}/${orderNumber}`);
};

// Get Order Confirmation Recommendations
export const getOrderConfirmationRecommendations = (
  profileId: string,
  siteId: number
) => {
  return apiClient.get(
    `/orderconfirmation-recommendations/v1/Site/Recommendations/OrderConfirmation/${profileId}`,
    { params: { siteId } }
  );
};

// Get Ewallet Customer Info
export const getEwalletCustomerInfo = (
  customerId: string,
  siteId: number,
  merchCountry?: string,
  langCode?: string,
  siteCountry?: string,
  siteType?: string
) => {
  return apiClient.get(`/ewallet/v1/customer/${customerId}`, {
    params: {
      merchCountry: merchCountry ?? "USA",
      langCode: langCode ?? "ENG",
      siteId: siteId,
      siteCountry: siteCountry ?? "USA",
      siteType: siteType ?? "SHP",
      api_key: GET_API_KEY(),
    },
  });
};

// Get Customer Profile Alt
export const getCustomerProfileAlt = (pcid: string) => {
  return apiClient.get(
    `/customer-profile-alt-service/v1/profiles/customers/${pcid}`,
    {
      params: {
        api_key: GET_API_KEY(),
      },
    }
  );
};
// Get Micro Shopper Portal Details
export const getMicroShopperPortalDetails = (shopperId: string) => {
  return apiClient.get(`/micro-shopper-portal/v1/Portal/Shopper/${shopperId}`, {
    params: {
      api_key: GET_API_KEY(),
    },
  });
};

// Post Order SMS Phone
export const postOrderSMSPhone = (data: {
  site_type: string;
  siteCountry: string;
  langCode: string;
  temp_order_id: string;
  sms_phone: string;
}) => {
  return apiClient.post(`/etrans-order-service/v1/order-sms-phone`, data, {
    params: {
      api_key: GET_API_KEY(),
    },
  });
};

// Put PrePC
export const updatePrePC = (data: {
  firstName: string;
  lastName: string;
  referrer?: string;
  password: string;
  mobilePhone?: string;
  passwordConfirm: string;
  portalname: string;
  optInIds: string;
  userSessionId: string;
  email: string;
}) => {
  return apiClient.put(`/shoppers/v1/PrePC`, new URLSearchParams(data as any), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;v=2",
    },
    params: {
      api_key: GET_API_KEY(),
    },
  });
};

const getFeedbackPath = (pcId: string | null | undefined) =>
  `/site-surveys/v1/Survey/${pcId}`;

export const postFeedback = async (
  baseUrl: string,
  feedback: string,
  pcId?: null | string | undefined,
  sessionId?: string | number | undefined,
  siteId?: string | number | undefined
): Promise<any> => {
  const baseUrlWithSiteId = baseUrl + `&siteId=${siteId}`;
  const apiEndpoint = baseUrlWithSiteId.replace(
    "{{path}}",
    getFeedbackPath(pcId)
  );
  const fullStoryLink = window.FS?.getCurrentSessionURL?.() || "";
  const feedbackPayload = {
    classid: "36",
    comments: feedback,
    httpreferrer: window.location.href,
    orderid: "0",
    surveytypeid: "17",
    userSessionId: sessionId?.toString() ?? "-1",
    trackingID: fullStoryLink,
  };

  try {
    const res = await axios.post(
      apiEndpoint,
      new URLSearchParams(feedbackPayload),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getValidShopperId = async (
  emailId: string
): Promise<IShopperInfo> => {
  const shopperIdEndpoint = `${GET_API_ENDPOINT_BASE_URL_FOR_GUEST(
    GET_API_MODE()
  )}/Directory/${emailId}`;
  const shopperDataResponse = await axios.get(shopperIdEndpoint, {
    params: {
      api_key: GET_API_KEY(),
    },
  });

  const pcIdEndpoint = `${GET_API_ENDPOINT_BASE_URL_FOR_GUEST(
    GET_API_MODE()
  )}/${shopperDataResponse.data.shopperID}/?details=true`;

  const pcIdDataResponse = await axios.get(pcIdEndpoint, {
    params: {
      api_key: GET_API_KEY(),
    },
  });

  return {
    shopperId: shopperDataResponse.data.shopperID,
    pcId: pcIdDataResponse.data.pcid,
  };
};

// Get Order Confirmation Content
export const getOrderConfirmationContentStrings = async (
  country: string = "USA",
  language: string = "ENG"
): Promise<IBluePrintResponse> => {
  const baseUrl = `${GET_API_ENDPOINT_BASE_URL_FOR_TRANSLATIONS(
    GET_API_MODE()
  )}`;
  const apiEndpoint = baseUrl.replace("{{path}}", "/content/v1/data");
  try {
    const res = await axios.get(apiEndpoint, {
      params: {
        collection: "orderConfirmation",
        country,
        language,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
