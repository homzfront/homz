import api from "@/utils/api";


export const fetchPropertyListedAll = async () => {
  try {
    const response = await api.get('/properties');
    console.log(response.data);
    return response.data
  } catch (error) {
    console.error('Error fetching estates:', error);
    throw error;
  }
};


export const fetchSingleProperty = async (id) => {
  try {
    const response = await api.get(`/properties/${id}`);
    console.log(response.data);
    return response.data
  } catch (error) {
    console.error('Error fetching estates:', error);
    throw error;
  }
};


export const fetchUpdateSingleProperty = async (id) => {
  try {
    const response = await api.patch(`/properties/${id}/property-detail`);
    console.log(response.data);
    return response.data
  } catch (error) {
    console.error('Error fetching estates:', error);
    throw error;
  }
};

