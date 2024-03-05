import api from "@/utils/api";

export const maintenanceByTenant = async (data) => {
  try {
    const response = await api.post(`/maintenances`, data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching miantenance:", error);
    throw error;
  }
};

export const maintenanceByASpecificTenant = async () => {
  try {
    const response = await api.get(`/maintenances/tenant`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching maintenance:", error);
    throw error;
  }
};

export const maintenanceAllByTenant = async (id) => {
  try {
    const response = await api.post(`/maintenances/tenant/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
};

export const maintenanceRequestForAnEnterprise = async () => {
  try {
    const response = await api.get(`/maintenances/enterprise`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching maintenance:", error);
    throw error;
  }
};

export const updateMaintenanceReqestByTenant = async ({ id, status }) => {
  console.log(id);
  console.log(status);
  try {
    const response = await api.patch(`/maintenances/${id}/update-status`, {
      status,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating:", error);
    throw error;
  }
};


export const maintenanceRequestForOwner = async () => {
  try {
    const response = await api.get(`/maintenances/propertyManager`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching maintenance:", error);
    throw error;
  }
};

export const maintenanceRequestForATenantEnterprise = async (id) => {
  console.log(id)
  try {
    const response = await api.get(`/maintenances/enterprise/${id}`);
    console.log(response.data);
    return response.data.data.results;
  } catch (error) {
    console.error("Error fetching tenants:", error.response?.data?.message);
    if (error.response?.data?.message === "No items found") {
      return {}
    }
    throw error;
  }
};


