import api from "@/utils/api";
export const landlordRevenueForAnEstate = async (id) => {
  try {
    const response = await api.get(`/estates/me/manageProperty/${id}/calculate-revenue`);
    return response.data.data;
  } catch (error) {
    if (error.response?.data?.error === "Estate does not have tenants") {
      return {}
    }
    throw error;
  }
};
