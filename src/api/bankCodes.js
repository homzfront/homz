import api from "@/utils/api";

export const bankCodes = async () => {
  try {
    const response = await api.get(`/bank/codes`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error wallet:", error);
    throw error;
  }
};


export const VerifyBank = async (accountNo, BankName) => {
  console.log(accountNo)
  console.log(BankName);
  try {
    const response = await api.post(`/bank/validate`, {
      accountNumber: accountNo,
      bankName: BankName?.label,
    });
    console.log(response);
    return { success: true, data: response?.data?.data };
  } catch (error) {
    console.error("Update error", error);
    return { success: false, error: error?.response.data };
  }
}