import api from "@/utils/api";

export const ConfirmTenantRequest = async (id, status) => {
  console.log(id);
  console.log(status);
  try {
    const response = await api.patch(`/tenantRequest/enterprise/${id}/status`, {
      status: status,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching estates:", error);
    throw error;
  }
};
