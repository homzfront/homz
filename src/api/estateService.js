import api from "@/utils/api";

export const fetchEstates = async () => {
  try {
    const response = await api.get("/estates");
    return response.data;
  } catch (error) {
    console.error("Error fetching estates:", error);
    throw error;
  }
};

export const fetchEstatesSpecificUSer = async (id) => {
  console.log(id);
  try {
    const response = await api.get(`/estates/${id}`);
    console.log(response);
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching estates:", error);
    throw error;
  }
};

export const fetchEstatesMe = async () => {
  try {
    const response = await api.get("/estates/me");
    return response.data;
  } catch (error) {
    console.error("Error fetching estates:", error);
    throw error;
  }
};

export const updateEstateInfo = async (estateId, updatedData) => {
  console.log(estateId);
  console.log(updatedData);
  try {
    const response = await api.patch(
      `/estates/${estateId}/estateInformation`,
      updatedData
    );
    return { success: true, upDateddata: response.data.data };
  } catch (error) {
    console.error("Update error", error);
    return { success: false, error: error?.response.data.message };
  }
};

export const updateContactInfo = async (estateId, updatedData) => {
  console.log(estateId);
  console.log(updatedData);
  try {
    const response = await api.patch(
      `/estates/${estateId}/estate-contact-information`,
      updatedData
    );
    return { success: true, upDateddata: response.data.data };
  } catch (error) {
    console.error("Update error", error);
    return { success: false, error: error?.response.data.message };
  }
};


export const updateEstateCoverPhoto = async (estateId, uploadedImage) => {
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
      `/estates/${estateId}/cover-photo`,
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

export const updateSingleEstatePhoto = async (estateId, uploadedImage, publicId) => {
  console.log(estateId);
  console.log(uploadedImage);
  console.log(publicId);

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
    };
    const response = await api.patch(
      `/estates/${estateId}/photos?publicId=${publicId}`,
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

export const fetchTenantRequest = async () => {
  try {
    const response = await api.get("/tenantRequest/enterprise");
    return response.data;
  } catch (error) {
    console.error("Error fetching requests:", error);
    throw error;
  }
};
