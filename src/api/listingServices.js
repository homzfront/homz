import api from "@/utils/api";

export const listingMe = async () => {
  try {
    const response = await api.get("/listingProperty/me");
    // console.log(response)
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const listingMarketerProfile = async (id) => {
  try {
    const response = await api.get(`/listingProperty/${id}/marketer`);
    // console.log(response)
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const updatePersonalInfoLister = async (data) => {
  // console.log(data)
  const formData = new FormData();
  formData.append("coverPhoto", data?.coverPhoto);
  formData.append("fullName", data?.fullName);
  formData.append("whatsappLink", data?.whatsApp);
  formData.append("phoneNumber", data?.phoneNumber);
  formData.append("houseAddress", data?.houseAddress);
  try {
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    const response = await api.patch(
      "listingProperty/me/update/personal-information",
      formData,
      { headers }
    );
    if (response.data.statuscode === 201 || 200) {
      return { success: true, updatedImage: response };
    } else {
      const error = response.data.message;
    }
  } catch (error) {
    return { success: false, error: error?.response.data.message };
  }
};


export const updateBusinessInfoLister = async (data) => {
 
  const formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
   
    if (key !="otherLinks") {
      formData.append(key, value);
    }
  }
  data?.otherLinks.forEach((link, index) => {
    formData.append(`otherLinks[${index}]`, link);
  });
  // console.log([...formData.entries()])
  try {
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    const response = await api.patch(
      "listingProperty/me/update/business-information",
      formData,
      { headers }
    );
    // console.log(response)
    if (response.data.statuscode === 201 || 200) {
      return { success: true, updatedImage: response };
    } else {
      const error = response.data.message;
      return { success: false, error };
    }
  } catch (error) {
    throw error
  }
};
