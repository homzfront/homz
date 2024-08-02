import api from "@/utils/api";
export default async function promoteProperty(
  date,
  propertyId,
  plan,
  propertyIds
) {
  try {
    var response;
    if (plan === "single") {
      response = await api.post(
        `/property/promotion/single-property/${propertyId}`,
        { endDate: date }
      );
    } else {
      response = await api.post(`/property/promotion/multiple-property`, {
        endDate: date,
        propertyIds: propertyIds,
      });
    }
    return response.data;
  } catch (error) {
    console.error(
      "Error promoting property:",
      error.response?.data || error.message
    );
    return error.response?.data || { message: "An unexpected error occurred." };
  }
}
