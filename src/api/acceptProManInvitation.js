import api from "@/utils/api";

export const acceptInvitation = async (email, role, invitation, isHomzEnterprise) => {
    try {
      const response = await api.post(`/enterpriseplan/role/accept-invitation-homz?email=${email}&role=${role}&invitation=${invitation}&isHomzEnterprise=${isHomzEnterprise}`);
      return { success: true, upDateddata: response.data };
    } catch (error) {
      return { success: false, error: error?.response?.data?.message };
    }
};

export const acceptSecondInvitation = async (email, role, invitation, isHomzEnterprise) => {
  try {
    const response = await api.post(`/enterpriseplan/role/property-owner/accept-invitation/add?email=${email}&role=${role}&invitation=${invitation}&isHomzEnterprise=${isHomzEnterprise}`);
    return { success: true, upDateddata: response.data };
  } catch (error) {
    return { success: false, error: error?.response?.data?.message };
  }
};

export const acceptSecondInvitationHomz = async (email, role, invitation, isHomzEnterprise) => {
  try {
    const response = await api.post(`/enterpriseplan/role/property-owner/accept-invitation-homz/add?email=${email}&role=${role}&invitation=${invitation}&isHomzEnterprise=${isHomzEnterprise}`);
    return { success: true, upDateddata: response.data };
  } catch (error) {
    return { success: false, error: error?.response?.data?.message };
  }
};

export const acceptEnterpriseInvitation = async (email, role, invitation, isHomzEnterprise, fullName, phoneNumber, password, confirmPasswword) => {
    try {
      const response = await api.post(`/accept-invitation/property-owner?email=${email}&role=${role}&invitation=${invitation}&isHomzEnterprise=${isHomzEnterprise}`, {
        fullName,
        phoneNumber,
        password,
        confirmPasswword
      });
      return { success: true, upDateddata: response.data };
    } catch (error) {
      return { success: false, error: error?.response?.data?.message };
    }
};