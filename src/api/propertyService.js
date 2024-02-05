import api from "@/utils/api";

export const fetchPropertyListedAll = async () => {
  try {
    const response = await api.get("/properties");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching estates:", error);
    throw error;
  }
};

export const fetchSingleProperty = async (id) => {
  try {
    const response = await api.get(`/properties/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching estates:", error);
    throw error;
  }
};


export const propertyForMe = async () => {
  try {
    const response = await api.get("/properties/user/me");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching estates:", error);
    throw error;
  }
};



export const updateContactInfo = async (propertyId, updatedData) => {
  console.log(propertyId);
  console.log(updatedData);
  try {
    const response = await api.patch(
      `/properties/${propertyId}/contact-detail`,
      updatedData
    );
    return { success: true, upDateddata: response.data.data };
  } catch (error) {
    console.error("Update error", error);
    return { success: false, error: error?.response.data.message };
  }
};

export const updatePropertyDetails = async (id, updatedData) => {
  console.log(updatedData);
  console.log(id);
  try {
    const response = await api.patch(
      `/properties/${id}/property-detail`,
      updatedData
    );
    console.log(response.data);
    return { success: true, upDateddata: response.data.data };
  } catch (error) {
    console.error("Update error", error);
    return { success: false, error: error?.response.data.message };
  }
};


export const updatePropertyCoverPhoto = async (estateId, uploadedImage) => {
  console.log(estateId);
  console.log(uploadedImage);

  const formData = new FormData();
  formData.append("coverPhoto", uploadedImage);

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
      `/properties/${estateId}/cover-photo`,
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


export const updatePropertyOtherPhoto = async (id, uploadedImage, publicId) => {
  console.log(id);
  console.log(uploadedImage);
  console.log(publicId)
  const formData = new FormData();
  formData.append("photos", uploadedImage);

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
      `/properties/${id}/photos?publicId=${publicId}`,
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



export const rentDetails = async (id, updatedData) => {
  console.log(updatedData);
  console.log(id);
  try {
    const response = await api.patch(
      `/properties/${id}/rent-detail`,
      updatedData
    );
    console.log(response.data);
    return { success: true, upDateddata: response.data.data };
  } catch (error) {
    console.error("Update error", error);
    return { success: false, error: error?.response.data.message };
  }
};



export const propertyMe = async () => {
  try {
    const response = await api.get("/manageProperty/me");
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
      `/manageProperty/personalInformation`,
      updatedData
    );
    return { success: true, upDateddata: response.data.data };
  } catch (error) {
    console.error("Update error", error);
    return { success: false, error: error?.response.data.message };
  }
};

export const updateProfilePicture = async (uploadedImage) => {
  console.log(uploadedImage);

  const formData = new FormData();
  formData.append("coverPhoto", uploadedImage);

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
      "/manageProperty/coverPhoto",
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