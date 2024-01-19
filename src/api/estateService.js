import api from "@/utils/api";


export const fetchEstates = async () => {
  try {
    const response = await api.get('/estates');
    return response.data
  } catch (error) {
    console.error('Error fetching estates:', error);
    throw error;
  }
};

export const fetchEstatesMe = async () => {
  try {
    const response = await api.get('/estates/me');
    return response.data
  } catch (error) {
    console.error('Error fetching estates:', error);
    throw error;
  }
}


export const fetchTenantRequest = async () => {
  try {
    const response = await api.get('/tenantRequest/enterprise');
    return response.data
  } catch (error) {
    console.error('Error fetching requests:', error);
    throw error;
  }
}