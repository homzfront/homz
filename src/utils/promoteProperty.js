import api from "@/utils/api";
export default async function promoteProperty(date, propertyId, plan) {
    try {
      const response = await api.post(`/property/promotion/single-property/${propertyId}`, { endDate: date });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error promoting property:", error.response?.data || error.message);
      return error.response?.data || { message: "An unexpected error occurred." };
    }
  }
