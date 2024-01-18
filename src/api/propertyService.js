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
