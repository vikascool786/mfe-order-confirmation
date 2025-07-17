import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://stagingapi2.shop.com",
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
export const getEwalletCustomerInfo = (customerId: string) => {
  return apiClient.get(
    `/ewallet/v1/customer/${customerId}`,
    {
      params: {
        merchCountry: "USA",
        langCode: "ENG",
        siteId: 222,
        siteCountry: "USA",
        siteType: "SHP",
        api_key: "759ef1fc9e4c4e8bbf900db5f4b7caba",
      },
    }
  );
};