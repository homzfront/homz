import api from "@/utils/api";


export const tenantNotificationReceive = async () => {
    try {
      const response = await api.get(`/notifications/tenant/receiver`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const updateTenantNoti = async (id) => {
    try {
        const response = await api.get(`/notifications/tenant/${id}`);
        return response.data;
      } catch (error) {
        throw error;
      }
    };
  
  