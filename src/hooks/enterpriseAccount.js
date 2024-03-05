// enterpriseAccountInfo.js
import api from '@/utils/api';
import { useQuery, useMutation, QueryClient, QueryClientProvider } from 'react-query';

const getEnterpiseAccountInfo = async () => {
  const response = await api.get('/enterprisePlan/me');
  const data = await response.data;
  return data;
};

const updateEnterpriseAccountInfo = async (updatedData) => {
  const response = await api.patch('/enterprisePlan/personalInformation', updatedData);
  const data = await response.data;
  return data;
};

const EnterpriseAccountInfo = () => {
  const { data, isLoading, isError } = useQuery('getEnterpiseAccountInfo', getEnterpiseAccountInfo);

  const mutation = useMutation(updateEnterpriseAccountInfo);

  return {
    AccountInfo: data,
    isLoading,
    isError,
    updateAccount: mutation.mutate,
  };
};

// Wrap your component with QueryClientProvider
const queryClient = new QueryClient();

const WrappedEnterpriseAccountInfo = () => (
  <QueryClientProvider client={queryClient}>
    <EnterpriseAccountInfo />
  </QueryClientProvider>
);

export default WrappedEnterpriseAccountInfo;
