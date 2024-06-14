// api.js
import { useQuery } from 'react-query';
import api from '@/utils/api'; // Your Axios instance

export const useEstates = () => {
  return useQuery('estates', async () => {
    const response = await api.get('/estates');
    return response.data;
  });
};
