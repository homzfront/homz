import api from "@/utils/api";

export const ConfirmTenantRequest = async (id, status) => {
  try {
    const response = await api.patch(`/tenantRequest/enterprise/${id}/status`, {
      status: status,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
