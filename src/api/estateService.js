import api from "@/utils/api";

export const fetchEstates = async () => {
  try {
    const response = await api.get("/estates");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchEstatesSpecificUSer = async (id) => {
  try {
    const response = await api.get(`/estates/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const fetchEstateRentReminders = async (id) => {
  try {
    const response = await api.get(`/rentReminder/${id}/estate`);
    return response;
  } catch (error) {
    throw error;
  }
}

export const getPropertyTenantLandlord = async (id) => {
  try {
    const response = await api.get(`/estates/${id}/tenants/property-owner`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
}

export const fetchEstatesMe = async () => {
  try {
    const response = await api.get("/estates/me/enterprise");
    // console.log(response)
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateEstateInfo = async (estateId, updatedData) => {
  try {
    const response = await api.patch(
      `/estates/${estateId}/estateInformation`,
      updatedData
    );
    return { success: true, upDateddata: response.data.data };
  } catch (error) {
    return { success: false, error: error?.response.data.message };
  }
};

export const updateContactInfo = async (estateId, updatedData) => {
  try {
    const response = await api.patch(
      `/estates/${estateId}/estate-contact-information`,
      updatedData
    );
    return { success: true, upDateddata: response.data.data };
  } catch (error) {
    return { success: false, error: error?.response.data.message };
  }
};

export const updateEstateBankInfo = async (estateId, updatedData) => {
  try {
    const response = await api.patch(
      `/estates/${estateId}/estate-bank-information`,
      updatedData
    );
    return { success: true, upDateddata: response.data.data };
  } catch (error) {
    return { success: false, error: error };
  }
};

export const updateEstateCoverPhoto = async (estateId, uploadedImage) => {
  const formData = new FormData();
  formData.append("coverPhoto", uploadedImage);

  // Convert FormData to object
  const formDataObject = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });

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
      return { success: true, updatedImage: response };
    } else {
      const error = response.data.message;
    }
  } catch (error) {
    return { success: false, error: error?.response.data.message };
  }
};

export const updateSingleEstatePhoto = async (
  estateId,
  uploadedImage,
  publicId
) => {
  const formData = new FormData();
  formData.append("photos", uploadedImage);

  // Convert FormData to object
  const formDataObject = {};
  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });

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
      return { success: true, updatedImage: response };
    } else {
      const error = response.data.message;  
    }
  } catch (error) {
    return { success: false, error: error?.response.data.message };
  }
};

export const fetchTenantRequest = async () => {
  try {
    const response = await api.get("/tenantRequest/enterprise");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const documentUpload = async (estateId, file, name) => {
  const formData = new FormData();
  formData.append("fileDocument", file);
  formData.append("fileName", name);

  try {
    const headers = {
      "Content-Type": "multipart/form-data",
    };
    const response = await api.post(
      `/estates/document/${estateId}/add`,
      formData,
      { headers }
    );
    if (response.data.statuscode === 201 || 200) {
      return { success: true, uploadedData: response };
    } else {
      const error = response.data.message;    
    }
  } catch (error) {
    return { success: false, error: error?.response.data.message };
  }
};

export const fetchEstateDocSpecificUSer = async (id) => {
  try {
    const response = await api.get(`/estates/document/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteEstateDocSpecificUSer = async ({ id, data_id }) => {
  try {
    const response = await api.delete(`/estates/document/${id}/remove/${data_id}`);
    return response;
  } catch (error) {
    throw error;
  }
};
