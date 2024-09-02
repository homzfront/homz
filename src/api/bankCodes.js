import api from "@/utils/api";

export const bankCodes = async () => {
  try {
    const response = await api.get(`/bank/codes`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const VerifyBank = async (accountNo, BankName) => {
  try {
    const response = await api.post(`/bank/validate`, {
      accountNumber: accountNo,
      bankName: BankName?.label || BankName,
    });
    return { success: true, data: response?.data?.data };
  } catch (error) {
    return { success: false, error };
  }
}