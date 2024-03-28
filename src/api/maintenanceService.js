import api from "@/utils/api";

export const maintenanceByTenant = async (data) => {
  try {
    const response = await api.post(`/maintenances`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const maintenanceByASpecificTenant = async () => {
  try {
    const response = await api.get(`/maintenances/tenant`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const maintenanceAllByTenant = async (id) => {
  try {
    const response = await api.post(`/maintenances/tenant/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const maintenanceRequestForAnEnterprise = async () => {
  try {
    const response = await api.get(`/maintenances/enterprise`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateMaintenanceReqestByTenant = async ({ id, status }) => {
  try {
    const response = await api.patch(`/maintenances/${id}/update-status`, {
      status,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const maintenanceRequestForOwner = async () => {
  try {
    const response = await api.get(`/maintenances/propertyManager`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const maintenanceRequestForATenantEnterprise = async (id) => {
  try {
    const response = await api.get(`/maintenances/enterprise/${id}`);
    return response.data.data.results;
  } catch (error) {
    if (error.response?.data?.message === "No items found") {
      return {}
    }
    throw error;
  }
};


