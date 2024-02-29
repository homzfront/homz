import api from "@/utils/api";

export const acceptInvitation = async (email, role, invitation, isHomzEnterprise) => {
  console.log(email);
  console.log(role);
  console.log(invitation)
  console.log(isHomzEnterprise);
    try {
      const response = await api.post(`/enterpriseplan/role/accept-invitation-homz?email=${email}&role=${role}&invitation=${invitation}&isHomzEnterprise=${isHomzEnterprise}`);
      console.log(response.data);
      return { success: true, upDateddata: response.data };
    } catch (error) {
      console.error("Error accepting invitation:", error);
      return { success: false, error: error?.response?.data?.message };
    }
};


export const acceptEnterpriseInvitation = async (email, role, invitation, isHomzEnterprise, fullName, phoneNumber, password, confirmPasswword) => {
  console.log(email);
  console.log(role);
  console.log(invitation)
  console.log(isHomzEnterprise);
  console.log(fullName);
  console.log(phoneNumber);
  console.log(password);
  console.log(confirmPasswword);
    try {
      const response = await api.post(`/enterpriseplan/role/accept-invitation/property-owner?email=${email}&role=${role}&invitation=${invitation}&isHomzEnterprise=${isHomzEnterprise}`, {
        fullName,
        phoneNumber,
        password,
        confirmPasswword
      });
      console.log(response.data);
      return { success: true, upDateddata: response.data };
    } catch (error) {
      console.error("Error accepting invitation:", error);
      return { success: false, error: error?.response?.data?.message };
    }
};