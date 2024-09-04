import api from "@/utils/api";

async function promoteProperty(date, propertyId, plan, propertyIds) {
  try {
    const endpoint =
      plan === "single"
        ? `/property/promotion/single-property/${propertyId}`
        : `/property/promotion/multiple-property`;

    const payload =
      plan === "single" ? { endDate: date } : { endDate: date, propertyIds };

    const response = await api.post(endpoint, payload);
    // console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);

    return error;
  }
}

async function stopSinglePromotion(propertyId) {
  try {
    const result = await api.put(
      `/property/promotion/promotion/stop/${propertyId}`
    );
    // console.log(result.data)
    return result.data;
  } catch (error) {
    console.log(error);
    console.error(
      "Error promoting property:",
      error.response?.data || error.message
    );
    return error.response?.data || { message: "An unexpected error occurred." };
  }
}
async function checkCurrentSubscription() {
  try {
    const results = await api.get(
      "/subscribe/listingProperty/current-subscription-Detail"
    );
    // console.log(results);
    return results;
  } catch (error) {
    console.error("Error", error.response?.data || error.message);
    return error;
  }
}
async function createSubscription(planName, interval, amount, upgradePlan) {
  // console.log(upgradePlan)
  try {
    const results = await api.post(
      `/subscribe/listingProperty/${upgradePlan ? "update" : "new"}`,
      {
        planName: planName,
        interval: interval,
        amount: amount,
      }
    );
    // console.log(results?.data?.data);
    return results?.data?.data?.paystackResponse;
  } catch (error) {
    console.error("Error", error.response?.data || error.message);
    return error;
  }
}

export default {
  stopSinglePromotion,
  promoteProperty,
  checkCurrentSubscription,
  createSubscription,
};
