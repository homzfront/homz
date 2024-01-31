import api from "@/utils/api";

export const enterpriseMe = async () => {
    try {
      const response = await api.get("/enterprisePlan/me");
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Error fetching estates:", error);
      throw error;
    }
  };

  export const updatePersonalInformation = async ( updatedData) => {
    console.log(updatedData);
    try {
      const response = await api.patch(
        `/enterprisePlan/personalInformation`,
        updatedData
      );
      return { success: true, upDateddata: response.data.data };
    } catch (error) {
      console.error("Update error", error);
      return { success: false, error: error?.response.data.message };
    }
  };


  export const updateBussinessInformation = async ( updatedData) => {
    console.log(updatedData);
    try {
      const response = await api.patch(
        `/enterprisePlan/bussinessInformation`,
        updatedData
      );
      return { success: true, upDateddata: response.data.data };
    } catch (error) {
      console.error("Update error", error);
      return { success: false, error: error?.response.data.message };
    }
  };

  
export const updateBusinessLogo = async (uploadedImage) => {
    console.log(uploadedImage);
  
    const formData = new FormData();
    formData.append("businessLogo", uploadedImage);
  
    // Convert FormData to object
    const formDataObject = {};
    formData.forEach((value, key) => {
      formDataObject[key] = value;
    });
  
    console.log(formDataObject);
  
    try {
      const headers = {
        "Content-Type": "multipart/form-data",
        // add other headers as needed
      };
      const response = await api.patch(
        "/enterprisePlan/bussinesslogo",
        formData,
        { headers }
      );
  
      if (response.data.statuscode === 201 || 200) {
        console.log(response.data.data);
        console.log("form successfully updated ", response?.data);
        return { success: true, updatedImage: response };
      } else {
        const error = response.data.message;
        console.log("Unexpected status code:", error);
      }
    } catch (error) {
      console.error("Update error", error);
      return { success: false, error: error?.response.data.message };
    }
};

export const updatePassword = async ( updatedData ) => {
    console.log(updatedData);
    try {
      const response = await api.patch(
        `/auth/change/password`,
        updatedData
      );
      console.log(response)
      return { success: true, upDateddata: response.data.data };
    } catch (error) {
      console.error("Update error", error);
      return { success: false, error: error?.response.data.message };
    }
  };

