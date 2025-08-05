import axios from "axios";
import {
  GET_API_ENDPOINT_BASE_URL_ONLY,
  GET_API_KEY,
} from "../../utils/urlResolver";

const apiClient = axios.create({
  baseURL: GET_API_ENDPOINT_BASE_URL_ONLY(),
  headers: {
    "Content-Type": "application/json",
  },
});

// Get Order Details
export const getOrderDetails = (orderId: string, orderNumber: string) => {
  return apiClient.get(`/store-orders/v1/Order/${orderId}/${orderNumber}`);
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
  return apiClient.post(
    `/etrans-order-service/v1/order-sms-phone`,
    data,
    {
      params: {
        api_key: GET_API_KEY(),
      },
    }
  );
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
  const fullStoryLink = window.FS.getCurrentSessionURL() || "";
  const feedbackPayload = {
    classid: 36,
    comments: feedback,
    httpreferrer: window.location.href,
    orderid: 0,
    surveytypeid: 17,
    userSessionId: sessionId || -1,
    trackingID: fullStoryLink,
  };

  try {
    const res = await axios.post(apiEndpoint, "", feedbackPayload, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => console.log(response))
      .catch((error) => console.error(error));

    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

