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
